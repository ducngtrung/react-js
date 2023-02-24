package com.example.blogbackend.service;

import com.example.blogbackend.dto.CategoryDto;
import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.exception.NotFoundException;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public WebService(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Blog> getAllBlogPublic() {
        return blogRepository.findByStatusOrderByPublishedAtDesc(true);
    }

    public List<Blog> searchBlog(String term) {
        return blogRepository.findByTitleContainsIgnoreCaseAndStatusOrderByPublishedAtDesc(term, true);
    }

    public List<CategoryDto> getAllCategory() {
        return categoryRepository.findCategoriesUsedOther();
    }

    public List<Blog> getBlogsOfCategory(String categoryName) {
        return blogRepository.findByCategories_NameAndStatusOrderByPublishedAtDesc(categoryName, true);
    }

    public Blog getBlogDetail(Integer blogId, String blogSlug) {
        return blogRepository.findByIdAndSlugAndStatus(blogId, blogSlug, true).orElseThrow(() -> {
           throw new NotFoundException(String.format("Not found blog with id = %d and slug = %s", blogId, blogSlug));
        });
    }

    public List<CategoryDto> getTop5Category() {
        List<CategoryDto> categoryDtos = categoryRepository.findCategoriesUsedOther();
        return categoryDtos.stream()
                .sorted((c1, c2) -> Math.toIntExact(c2.getUsed() - c1.getUsed()))
                .limit(5)
                .toList();
    }
}
