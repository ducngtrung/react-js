package techmaster.blogbackend;

import com.github.javafaker.Faker;
import com.github.slugify.Slugify;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import techmaster.blogbackend.entity.Blog;
import techmaster.blogbackend.entity.Category;
import techmaster.blogbackend.entity.Comment;
import techmaster.blogbackend.entity.User;
import techmaster.blogbackend.repository.BlogRepository;
import techmaster.blogbackend.repository.CategoryRepository;
import techmaster.blogbackend.repository.CommentRepository;
import techmaster.blogbackend.repository.UserRepository;

import java.util.*;

@DataJpaTest // chuyên dùng để test repository
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InitDataTests {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private Faker faker;
    @Autowired
    private Slugify slugify;

    @Test
    @Rollback(value = false) // nếu không có value = false thì app sẽ rollback mọi thay đổi sau khi chạy test xong
    void init_users() {
        for (int i = 0; i < 5; ++i) {
            User user = User.builder()
                    .name(faker.name().fullName())
                    .email(faker.internet().emailAddress())
                    .password("111")
                    .build();

            userRepository.save(user);
        }
    }

    @Test
    @Rollback(value = false) // nếu không có value = false thì app sẽ rollback mọi thay đổi sau khi chạy test xong
    void init_categories() {
        for (int i = 0; i < 5; ++i) {
            Category category = Category.builder()
                    .name(faker.programmingLanguage().name())
                    .build();

            categoryRepository.save(category);
        }
    }

    @Test
    @Rollback(value = false) // nếu không có value = false thì app sẽ rollback mọi thay đổi sau khi chạy test xong
    void init_blogs() {
        Random random = new Random();

        List<User> users = userRepository.findAll();
        List<Category> categories = categoryRepository.findAll();

        for (int i = 0; i < 20; ++i) {
            // Random 1 user
            User randomUser = users.get(random.nextInt(users.size()));

            // Random 1 danh sách categories
            Set<Category> randomCategories = new LinkedHashSet<>();
            for (int j = 0; j < 2; ++j) {
                Category randomCategory = categories.get(random.nextInt(categories.size()));
                randomCategories.add(randomCategory);
            }

            String title = faker.lorem().sentence(10);
            Blog blog = Blog.builder()
                    .title(title)
                    .slug(slugify.slugify(title))
                    .description(faker.lorem().sentence(20))
                    .content(faker.lorem().sentence(100))
                    .status(random.nextInt(2) == 1)
                    .user(randomUser)
                    .categories(randomCategories)
                    .build();

            blogRepository.save(blog);
        }
    }

    @Test
    @Rollback(value = false) // nếu không có value = false thì app sẽ rollback mọi thay đổi sau khi chạy test xong
    void init_comments() {
        Random random = new Random();

        List<User> users = userRepository.findAll();
        List<Blog> blogs = blogRepository.findAll();

        for (int i = 0; i < 50; ++i) {
            // Random 1 user
            User randomUser = users.get(random.nextInt(users.size()));

            // Random 1 blog
            Blog randomBlog = blogs.get(random.nextInt(blogs.size()));

            Comment comment = Comment.builder()
                    .content(faker.lorem().sentence(20))
//                    .blog(randomBlog)
                    .user(randomUser)
                    .build();

            commentRepository.save(comment);
        }
    }

}