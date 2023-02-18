package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
}