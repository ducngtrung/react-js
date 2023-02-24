package techmaster.blogbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import techmaster.blogbackend.entity.Image;
import techmaster.blogbackend.entity.User;
import techmaster.blogbackend.exception.BadRequestException;
import techmaster.blogbackend.exception.NotFoundException;
import techmaster.blogbackend.repository.ImageRepository;
import techmaster.blogbackend.repository.UserRepository;
import techmaster.blogbackend.response.ImageResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserRepository userRepository;

    public List<String> getAllImage() {
        // TODO : Sau nay user chính là user đang đăng nhập (Hiện tại đang fix)
        Integer userId = 1;

        List<Image> images = imageRepository.findByUser_IdOrderByCreatedAtDesc(userId);

        return images.stream()
                .map(image -> "/api/images/" + image.getId())
                .toList();
    }

    public byte[] readImage(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found image with id = " + id);
        });

        return image.getData();
    }

    public ImageResponse uploadImage(MultipartFile file) {
        // TODO : Sau nay user chính là user đang đăng nhập (Hiện tại đang fix)
        Integer userId = 1;
        User user = userRepository.findById(userId).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + userId);
        });

        // Validate file
        validateFile(file);

        try {
            Image image = Image.builder()
                    .data(file.getBytes())
                    .user(user)
                    .build();

            imageRepository.save(image);

            String url = "/api/images/" + image.getId();
            return new ImageResponse(url);
        } catch (Exception e) {
            throw new RuntimeException("Upload image error");
        }
    }

    private void validateFile( MultipartFile file) {
        // Kiểm tra tên file
        String fileName = file.getOriginalFilename();
        if(fileName == null || fileName.isEmpty()) {
            throw new BadRequestException("file không không được để trống");
        }

        // image.png -> png
        // avatar.jpg -> jpg
        // Kiểm tra đuôi file (jpg, png, jpeg)
        String fileExtension = getFileExtensiton(fileName);
        if(!checkFileExtension(fileExtension)) {
            throw new BadRequestException("file không đúng định dạng");
        }

        // Kiểm tra dung lượng file (<= 2MB)
        double fileSize =  (double) (file.getSize() / 1_048_576);
        if( fileSize > 2) {
            throw new BadRequestException("file không được vượt quá 2MB");
        }
    }

    private String getFileExtensiton(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        return fileName.substring(lastIndexOf + 1);
    }

    private boolean checkFileExtension(String fileExtension) {
        List<String> extensions = new ArrayList<>(List.of("png", "jpg", "jpeg", "pdf"));
        return extensions.contains(fileExtension.toLowerCase());
    }

    public void deleteImage(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found image with id = " + id);
        });

        imageRepository.delete(image);
    }
}
