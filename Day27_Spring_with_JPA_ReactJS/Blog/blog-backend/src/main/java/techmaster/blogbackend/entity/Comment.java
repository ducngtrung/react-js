package techmaster.blogbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "comment")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    Nếu entity Comment có ràng buộc many-to-one với entity Blog thì khi xóa một blog sẽ cần xử lý xóa tất cả các comment liên quan đến blog đó. Tạm thời chưa thêm ràng buộc này để có thể xử lý xóa blog đơn giản hơn.
//    @ManyToOne
//    @JoinColumn(name = "blog_id")
//    private Blog blog;

    @PrePersist // Lifecycle
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate // Lifecycle
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}