package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import techmaster.blogbackend.dto.CategoryDto;
import techmaster.blogbackend.entity.Category;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Set<Category> findByIdIn(List<Integer> ids); // Tìm kiếm categories theo danh sách id

    // Lấy Dto bằng JPQL
    @Query("select new techmaster.blogbackend.dto.CategoryDto(c.id, c.name, count(1)) " +
            "from Category c " +
            "left join Blog b " +
            "where b.status = true " +
            "group by c.id, c.name")
    List<CategoryDto> findCategoriesUsed();

    // Lấy Dto bằng Native Query
    @Query(nativeQuery = true, name = "findCategoriesUsedOther")
    List<CategoryDto> findCategoriesUsedOther();
}