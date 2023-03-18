package techmaster.blogbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import techmaster.blogbackend.service.ImageService;

@RestController
@RequestMapping("/api/images")
// Đây là controller dùng chung cho cả user và admin (vì cả user và admin đều có thể thực hiện các thao tác xem/upload/xóa ảnh), do đó không nên đưa "admin" vào đường dẫn API
public class ImageController {

    @Autowired
    private ImageService imageService;

    // Lấy danh sách ảnh của user
    // Trả về list các đường dẫn ảnh
    // Ví dụ:
    //    /api/images/1
    //    /api/images/2
    @GetMapping("")
    public ResponseEntity<?> getAllImages() {
        return ResponseEntity.ok(imageService.getAllImages());
    }

    // Xem ảnh
    @GetMapping("{id}")
    public ResponseEntity<?> readImage(@PathVariable Integer id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageService.readImage(id));
    }

    // Upload ảnh
    @PostMapping("")
    public ResponseEntity<?> uploadImage(@ModelAttribute("file") MultipartFile file) {
        return new ResponseEntity<>(imageService.uploadImage(file), HttpStatus.CREATED);
    }

    // Xóa ảnh
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build(); // 204
    }
}