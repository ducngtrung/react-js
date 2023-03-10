package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import techmaster.blogbackend.entity.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    // Dùng JPA Buddy để tạo câu query JPQL
    @Query("select i from Image i where i.user.id = ?1 order by i.createdAt DESC")
    List<Image> findByUser_IdOrderByCreatedAtDesc(Integer id);
}