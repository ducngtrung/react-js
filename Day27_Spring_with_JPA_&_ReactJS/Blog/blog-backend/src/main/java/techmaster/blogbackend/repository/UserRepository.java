package techmaster.blogbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import techmaster.blogbackend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}