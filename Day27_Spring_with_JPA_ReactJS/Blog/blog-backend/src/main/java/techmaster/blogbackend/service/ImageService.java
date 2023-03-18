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

    public List<String> getAllImages() {
        // Sau khi học Spring Security thì sẽ gắn các phương thức này với id cụ thể của user đang đăng nhập
        // Hiện tại mặc định userId = 1
        Integer userId = 1;

        List<Image> images = imageRepository.findByUser_IdOrderByCreatedAtDesc(userId);

        // Trả về các đường dẫn ảnh "/api/images/{id}" để khi truy cập đường dẫn ảnh sẽ gọi API để xem được ảnh luôn
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

    public void deleteImage(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found image with id = " + id);
        });

        imageRepository.delete(image);
    }

    public ImageResponse uploadImage(MultipartFile file) {
        // Sau khi học Spring Security thì sẽ gắn các phương thức này với id cụ thể của user đang đăng nhập
        // Hiện tại mặc định userId = 1
        Integer userId = 1;

        // Tìm ra user có id = userId bên trên
        User user = userRepository.findById(userId).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + userId);
        });

        // Validate file
        validateFile(file);

        // Tạo một đối tượng Image:
        //    - Thông tin chính gồm data và user
        //    - id được auto-generated bởi JPA
        //    - createdAt được tự động gán bằng LocalDateTime.now (dùng @PrePersist)
        try {
            Image image = Image.builder()
                    .data(file.getBytes())
                    .user(user)
                    .build();

            // Lưu image vừa tạo vào DB
            imageRepository.save(image);

            // Trả về một đối tượng ImageResponse chứa đường dẫn ảnh có dạng "/api/images/{id}"
            // để khi gọi API thì dữ liệu trả về là một valid JSON
            // (thay vì trả về trực tiếp chuỗi "/api/images/{id}")
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

}