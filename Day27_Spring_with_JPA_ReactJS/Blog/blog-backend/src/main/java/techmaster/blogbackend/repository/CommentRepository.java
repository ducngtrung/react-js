package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}