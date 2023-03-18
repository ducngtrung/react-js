import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLazySearchBlogQuery } from "../../app/services/blog.api";

function Search() {
    // const [term, setTerm] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [searchBlog] = useLazySearchBlogQuery();

    const schema = yup
        .object({
            term: yup.string().required("Từ khóa không được để trống"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            try {
                let { data } = await searchBlog(term);
                setBlogs(data);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Tìm kiếm</title>
            </Helmet>
            <main className="main">
                <header className="page-header">
                    <h1>Search</h1>
                    <div className="post-description">Tìm kiếm bài viết</div>
                    <div className="post-meta"></div>
                </header>
                <div id="searchbox">
                    <form onSubmit={handleSubmit()}>
                        <input
                            id="searchInput"
                            placeholder="Tìm kiếm bài viết"
                            autoComplete="off"
                            onKeyDown={(e) => handleSearch(e)}
                            {...register("term")}
                        />
                        <span style={{ color: "red" }}>
                            {errors.term?.message}
                        </span>

                        <button type="submit">Search</button>
                    </form>

                    <ul id="searchResults">
                        {blogs.map((b) => (
                            <li class="post-entry">
                                <header class="entry-header">{b.title}</header>
                                <a
                                    href={`/blogs/${b.id}/${b.slug}`}
                                    aria-label={b.title}
                                ></a>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default Search;
