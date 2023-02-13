package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.Category;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Set<Category> findByIdIn(List<Integer> ids); // Tìm kiếm categories theo danh sách id

}