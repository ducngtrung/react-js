package techmaster.blogbackend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import techmaster.blogbackend.request.UpsertBlogRequest;
import techmaster.blogbackend.service.BlogService;

@RestController
@RequestMapping("/api/admin/blogs")
@Slf4j // annotation này hỗ trợ ghi log vào Console
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Lấy danh sách blogs
    @GetMapping("")
    public ResponseEntity<?> getALlBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    // Tạo blog
    @PostMapping("")
    public ResponseEntity<?> createBlog(@RequestBody UpsertBlogRequest request) {
        return new ResponseEntity<>(blogService.createBlog(request), HttpStatus.CREATED);
    }

    // Xem chi tiết blog
    @GetMapping("{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    // Cập nhật blog
    @PutMapping("{id}")
    public ResponseEntity<?> updateBlogById(@PathVariable Integer id, @RequestBody UpsertBlogRequest request) {
        // Log thông tin id và request body vào Console để kiểm tra
        log.info("id : {}", id);
        log.info("request : {}", request);

        return ResponseEntity.ok(blogService.updateBlogById(id, request));
    }

    // Xóa blog
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteBlogById(@PathVariable Integer id) {
        blogService.deleteBlogById(id);
        return ResponseEntity.noContent().build();
    }

}