package techmaster.blogbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Table(name = "blog")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    private String thumbnail; // ảnh minh họa của blog

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(name = "blog_category",
            joinColumns = @JoinColumn(name = "blog_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private Set<Category> categories = new LinkedHashSet<>();

    @PrePersist // Lifecycle
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (status) {
            publishedAt = LocalDateTime.now();
        } else {
            publishedAt = null;
        }
    }

    @PreUpdate // Lifecycle
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
        if (status) {
            publishedAt = LocalDateTime.now();
        } else {
            publishedAt = null;
        }
    }
}