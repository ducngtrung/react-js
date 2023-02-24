package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByStatusOrderByPublishedAtDesc(Boolean status);

    List<Blog> findByTitleContainsIgnoreCaseAndStatusOrderByPublishedAtDesc(String title, Boolean status);

    Optional<Blog> findByIdAndSlugAndStatus(Integer id, String slug, Boolean status);

    List<Blog> findByCategories_NameAndStatusOrderByPublishedAtDesc(String name, Boolean status);
}