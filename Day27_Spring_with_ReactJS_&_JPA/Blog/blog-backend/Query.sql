------ ĐỀ BÀI: https://gist.github.com/buihien0109/234d01744e77436b0de5483d5ecdca99


-- 1.1. Lấy thông tin của blog đã được public sắp xếp theo ngày tạo giảm dần

SELECT b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
COUNT(c.id) as count_comment,
JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
WHERE status = TRUE
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 1.2. Lấy thông tin của blog đã được public sắp xếp theo ngày tạo giảm dần (có phân trang (page + limit))
-- LIMIT_value = Records_per_page;
-- OFFSET_value = (page_Number - 1) * Records_per_page;

SELECT b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
COUNT(c.id) as count_comment,
JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
WHERE status = TRUE
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC
LIMIT 3 OFFSET 0;


-- 2. Lấy danh sách 3 bài viết có lượng comment lớn nhất

SELECT b.id, b.title, b.slug, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
GROUP BY b.id, b.title, b.slug, b.published_at
ORDER BY COUNT(c.id) DESC
LIMIT 3;


-- 3. Lấy danh sách 3 category được áp dụng nhiều nhất

SELECT c.id, c.name
FROM `db-blog`.category c
LEFT JOIN `db-blog`.blog_category bc on c.id = bc.category_id
GROUP BY c.id, c.name
ORDER BY COUNT(c.id) DESC
LIMIT 3;


-- 4. Lấy danh sách bài viết dựa theo category_id (Kết quả trả về giống câu 1)

SELECT b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
COUNT(c.id) as count_comment,
JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
LEFT JOIN `db-blog`.blog_category bc on b.id = bc.blog_id
WHERE bc.category_id = 52
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 5. Lấy thông tin về tác giả của 1 bài viết cụ thể

SELECT JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
WHERE b.id = 16;


-- 6. Lấy danh sách bài viết theo tác giả (user_id) (Kết quả trả về giống câu 1)

SELECT b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
COUNT(c.id) as count_comment,
JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
WHERE b.user_id = 4
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 7.1. Lấy danh sách comment của 1 bài viết cụ thể (theo blog_id), sắp xếp theo ngày tạo comment giảm dần

SELECT u.id, u.name, u.avatar, DATE_FORMAT(c.created_at, "%d/%m/%Y"), c.content
FROM `db-blog`.comment c
LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
WHERE c.blog_id = 20
ORDER BY c.created_at DESC;

SELECT JSON_ARRAYAGG(JSON_OBJECT(
	'id', u.id, 
	'name', u.name,
	'avatar', u.avatar,
	'created_at', DATE_FORMAT(c.created_at, "%d/%m/%Y"),
	'content', c.content
))
FROM `db-blog`.comment c
LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
WHERE c.blog_id = 20
ORDER BY c.created_at DESC;


-- 7.2. Lấy danh sách comment của từng bài viết (theo blog_id)

SELECT 
	b.id as blog_id,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id', c.user_id, 
			'name', u.name,
			'avatar', u.avatar,
			'created_at', DATE_FORMAT(c.created_at, "%d/%m/%Y"),
			'content', c.content
		)
	) as comments
FROM `db-blog`.comment c
LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
GROUP BY b.id;


-- 8. Lấy thông tin bài viết theo blog_id

SELECT b.id, b.title, b.slug, b.description, b.content, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
WHERE b.id = 20;


-- 9. Tổng hợp câu 7 + 8: Lấy thông tin bài viết kèm theo thông tin tác giả và thông tin comment của bài viết đó

WITH blog_comments AS (
	SELECT 
		b.id as blog_id,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', c.user_id, 
				'name', u.name,
				'avatar', u.avatar,
				'created_at', DATE_FORMAT(c.created_at, "%d/%m/%Y"),
				'content', c.content
			)
		) as comments
	FROM `db-blog`.comment c
	LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
	LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
	GROUP BY b.id
)
SELECT 
	b.id, b.title, b.slug, b.description, b.content, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	JSON_OBJECT('id', b.user_id, 'name', u.name) as author,
	bc.comments as comments
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on b.id = c.blog_id
LEFT JOIN blog_comments bc on b.id = bc.blog_id
WHERE b.id = 20
GROUP BY b.id, b.title, b.slug, b.description, b.content, b.thumbnail, b.published_at, bc.comments;
