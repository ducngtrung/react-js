package techmaster.blogbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import techmaster.blogbackend.service.WebService;

@RestController
@RequestMapping("/api") // Đây là controller chứa các API được sử dụng ở phía user (front-end), nên có thể đưa đưa "user" vào đường dẫn API để tường minh hơn, tức là "/api/user"
public class WebController {

    @Autowired
    private WebService webService;

    @GetMapping("blogs")
    public ResponseEntity<?> getAllBlogPublic() {
        return ResponseEntity.ok(webService.getAllBlogPublic());
    }

    @GetMapping("blogs/search")
    public ResponseEntity<?> searchBlog(@RequestParam String term) {
        return ResponseEntity.ok(webService.searchBlog(term));
    }

    @GetMapping("categories")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(webService.getAllCategory());
    }

    @GetMapping("categories/top5")
    public ResponseEntity<?> getTop5Category() {
        return ResponseEntity.ok(webService.getTop5Category());
    }

    @GetMapping("categories/{categoryName}")
    public ResponseEntity<?> getBlogsOfCategory(@PathVariable String categoryName) {
        return ResponseEntity.ok(webService.getBlogsOfCategory(categoryName));
    }

    @GetMapping("blogs/{blogId}/{blogSlug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer blogId, @PathVariable String blogSlug) {
        return ResponseEntity.ok(webService.getBlogDetail(blogId, blogSlug));
    }
}