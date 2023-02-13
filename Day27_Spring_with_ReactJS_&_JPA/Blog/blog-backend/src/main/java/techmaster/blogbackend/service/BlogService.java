package techmaster.blogbackend.service;

import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import techmaster.blogbackend.entity.Blog;
import techmaster.blogbackend.entity.Category;
import techmaster.blogbackend.entity.User;
import techmaster.blogbackend.exception.NotFoundException;
import techmaster.blogbackend.repository.BlogRepository;
import techmaster.blogbackend.repository.CategoryRepository;
import techmaster.blogbackend.repository.UserRepository;
import techmaster.blogbackend.request.UpsertBlogRequest;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BlogService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private Slugify slugify;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog getBlogById(Integer id) {
        return blogRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found blog with id = " + id);
        });
    }

    @Transactional
    public Blog createBlog(UpsertBlogRequest request) {
        // Tìm kiếm categories theo danh sách id lấy từ request
        Set<Category> categories = categoryRepository.findByIdIn(request.getCategoryIds());

        // TODO: Sau này sẽ lấy ra id của user đang đăng nhập
        Integer userId = 1;
        User user = userRepository.findById(userId).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + userId);
        });

        // Tạo blog
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .slug(slugify.slugify(request.getTitle()))
                .description(request.getDescription())
                .content(request.getContent())
                .thumbnail(request.getThumbnail())
                .status(request.getStatus())
                .categories(categories)
                .user(user)
                .build();

        return blogRepository.save(blog);
    }

    @Transactional
    public Blog updateBlogById(Integer id, UpsertBlogRequest request) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found blog with id = " + id);
        });

        // Tìm kiếm categories theo danh sách id lấy từ request
        Set<Category> categories = categoryRepository.findByIdIn(request.getCategoryIds());

        blog.setTitle(request.getTitle());
        blog.setSlug(slugify.slugify(request.getTitle()));
        blog.setDescription(request.getDescription());
        blog.setContent(request.getContent());
        blog.setThumbnail(request.getThumbnail());
        blog.setStatus(request.getStatus());
        blog.setCategories(categories);

        return blogRepository.save(blog);
    }

    public void deleteBlogById(Integer id) {
        // TODO: Lưu ý khi xóa blog vì nó liên quan đến category và comment (sử dụng Lifecycle @PreRemove để xử lý)
        // Xóa blog -> xóa comment của blog đó
        // Xóa blog -> xóa row tương ứng trong bảng trung gian blog_category, không xóa category
        Blog blog = blogRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found blog with id = " + id);
        });

        blogRepository.delete(blog);
    }

}