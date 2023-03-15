package techmaster.blogbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "image")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Lob // Large object
    // Đọc thêm: https://www.baeldung.com/hibernate-lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    // columnDefinition là LONGBLOB để chứa được file lớn hơn
    // Nếu đã tạo DB xong sau đó mới thêm columnDefinition thì phải drop DB và tạo lại
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}