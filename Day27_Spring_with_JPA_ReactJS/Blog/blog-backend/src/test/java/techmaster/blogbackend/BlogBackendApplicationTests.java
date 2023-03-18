package techmaster.blogbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import techmaster.blogbackend.dto.CategoryDto;
import techmaster.blogbackend.repository.CategoryRepository;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BlogBackendApplicationTests {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void findCategoriesUsed_test() {
        List<CategoryDto> categoryDtoList = categoryRepository.findCategoriesUsed();
        categoryDtoList.forEach(System.out::println);
    }

    @Test
    void findCategoriesUsedOther_test() {
        List<CategoryDto> categoryDtoList = categoryRepository.findCategoriesUsedOther();
        categoryDtoList.forEach(System.out::println);
    }

}