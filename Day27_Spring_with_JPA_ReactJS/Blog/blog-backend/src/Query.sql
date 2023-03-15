------ Ä�á»€ BÃ€I: https://gist.github.com/buihien0109/234d01744e77436b0de5483d5ecdca99


-- 1.1. Láº¥y thÃ´ng tin cá»§a blog sáº¯p xáº¿p theo ngÃ y táº¡o giáº£m dáº§n

SELECT 
	b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	COUNT(c.id) as count_comment,
	JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 1.2. Láº¥y thÃ´ng tin cá»§a blog Ä‘Ã£ Ä‘Æ°á»£c public sáº¯p xáº¿p theo ngÃ y táº¡o giáº£m dáº§n (cÃ³ phÃ¢n trang (page + limit))
-- LIMIT_value = Records_per_page;
-- OFFSET_value = (page_Number - 1) * Records_per_page;

SELECT 
	b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	COUNT(c.id) as count_comment,
	JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
WHERE status = TRUE
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC
LIMIT 3 OFFSET 0;


-- 2. Láº¥y danh sÃ¡ch 3 bÃ i viáº¿t cÃ³ lÆ°á»£ng comment lá»›n nháº¥t

SELECT b.id, b.title, b.slug, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
GROUP BY b.id, b.title, b.slug, b.published_at
ORDER BY COUNT(c.id) DESC
LIMIT 3;


-- 3. Láº¥y danh sÃ¡ch 3 category Ä‘Æ°á»£c Ã¡p dá»¥ng nhiá»�u nháº¥t

SELECT c.id, c.name
FROM `db-blog`.category c
LEFT JOIN `db-blog`.blog_category bc on c.id = bc.category_id
GROUP BY c.id, c.name
ORDER BY COUNT(c.id) DESC
LIMIT 3;


-- 4. Láº¥y danh sÃ¡ch bÃ i viáº¿t dá»±a theo category_id (Káº¿t quáº£ tráº£ vá»� giá»‘ng cÃ¢u 1)

SELECT 
	b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	COUNT(c.id) as count_comment,
	JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
LEFT JOIN `db-blog`.blog_category bc on b.id = bc.blog_id
WHERE bc.category_id = 52
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 5. Láº¥y thÃ´ng tin vá»� tÃ¡c giáº£ cá»§a 1 bÃ i viáº¿t cá»¥ thá»ƒ

SELECT JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
WHERE b.id = 16;


-- 6. Láº¥y danh sÃ¡ch bÃ i viáº¿t theo tÃ¡c giáº£ (user_id) (Káº¿t quáº£ tráº£ vá»� giá»‘ng cÃ¢u 1)

SELECT 
	b.id, b.title, b.slug, b.description, b.thumbnail, DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	COUNT(c.id) as count_comment,
	JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on c.blog_id = b.id
WHERE b.user_id = 4
GROUP BY b.id, b.title, b.slug, b.description, b.thumbnail, b.published_at, u.id, u.name
ORDER BY b.created_at DESC;


-- 7.1. Láº¥y danh sÃ¡ch comment cá»§a 1 bÃ i viáº¿t cá»¥ thá»ƒ (theo blog_id), sáº¯p xáº¿p theo ngÃ y táº¡o comment giáº£m dáº§n

SELECT u.id, u.name, u.avatar, DATE_FORMAT(c.created_at, "%d/%m/%Y"), c.content
FROM `db-blog`.comment c
LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
WHERE c.blog_id = 20
ORDER BY c.created_at DESC;

SELECT JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', u.id, 
				'name', u.name,
				'avatar', u.avatar,
				'created_at', DATE_FORMAT(c.created_at, "%d/%m/%Y"),
				'content', c.content
			)
		)
FROM `db-blog`.comment c
LEFT JOIN `db-blog`.`user` u on c.user_id = u.id
LEFT JOIN `db-blog`.blog b on c.blog_id = b.id
WHERE c.blog_id = 20
ORDER BY c.created_at DESC;


-- 7.2. Láº¥y danh sÃ¡ch comment cá»§a tá»«ng bÃ i viáº¿t (theo blog_id)

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


-- 8. Láº¥y thÃ´ng tin bÃ i viáº¿t theo blog_id

SELECT 
	b.id, b.title, b.slug, b.description, b.content, b.thumbnail, 
	DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	JSON_OBJECT('id', u.id, 'name', u.name) as author
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
WHERE b.id = 20;


-- 9. Tá»•ng há»£p cÃ¢u 7 + 8: Láº¥y thÃ´ng tin bÃ i viáº¿t kÃ¨m theo thÃ´ng tin tÃ¡c giáº£ vÃ  thÃ´ng tin comment cá»§a bÃ i viáº¿t Ä‘Ã³

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
	b.id, b.title, b.slug, b.description, b.content, b.thumbnail, 
	DATE_FORMAT(b.published_at, "%d/%m/%Y") as published_at,
	JSON_OBJECT('id', b.user_id, 'name', u.name) as author,
	bc.comments as comments
FROM `db-blog`.blog b
LEFT JOIN `db-blog`.`user` u on b.user_id = u.id
LEFT JOIN `db-blog`.comment c on b.id = c.blog_id
LEFT JOIN blog_comments bc on b.id = bc.blog_id
WHERE b.id = 20
GROUP BY b.id, b.title, b.slug, b.description, b.content, b.thumbnail, b.published_at, bc.comments;
