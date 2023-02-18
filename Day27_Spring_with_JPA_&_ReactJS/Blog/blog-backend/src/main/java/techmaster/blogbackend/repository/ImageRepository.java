package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}