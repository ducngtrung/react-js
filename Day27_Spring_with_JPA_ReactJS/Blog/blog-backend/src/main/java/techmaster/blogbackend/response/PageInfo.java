package com.example.blogbackend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageInfo<T> {
    private List<T> data;
    private Integer currentPage;
    private Integer pageSize;
    private Integer totalPage;
    private Integer totalElement;
}
