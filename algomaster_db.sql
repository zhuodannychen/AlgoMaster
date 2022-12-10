--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    user_id integer NOT NULL,
    contest_id integer NOT NULL,
    comment_desc text NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: contest_problem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contest_problem (
    contest_id integer,
    problem_id integer
);


ALTER TABLE public.contest_problem OWNER TO postgres;

--
-- Name: contests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contests (
    contest_id integer NOT NULL,
    contest_name character varying(255) NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL
);


ALTER TABLE public.contests OWNER TO postgres;

--
-- Name: contests_contest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contests_contest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contests_contest_id_seq OWNER TO postgres;

--
-- Name: contests_contest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contests_contest_id_seq OWNED BY public.contests.contest_id;


--
-- Name: problems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.problems (
    problem_id integer NOT NULL,
    problem_name character varying(255) NOT NULL,
    problem_desc character varying(255),
    problem_url character varying(255)
);


ALTER TABLE public.problems OWNER TO postgres;

--
-- Name: problems_problem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.problems_problem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.problems_problem_id_seq OWNER TO postgres;

--
-- Name: problems_problem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.problems_problem_id_seq OWNED BY public.problems.problem_id;


--
-- Name: user_contest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_contest (
    user_id integer NOT NULL,
    contest_id integer NOT NULL
);


ALTER TABLE public.user_contest OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    firstname character varying(50),
    lastname character varying(50),
    isadmin boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: usercontestview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.usercontestview AS
 SELECT contests.contest_id,
    contests.contest_name,
    contests.start_date,
    contests.end_date,
    users.user_id,
    users.username,
    users.password,
    users.firstname,
    users.lastname,
    users.isadmin
   FROM ((public.contests
     JOIN public.user_contest ON ((contests.contest_id = user_contest.contest_id)))
     JOIN public.users ON ((users.user_id = user_contest.user_id)));


ALTER TABLE public.usercontestview OWNER TO postgres;

--
-- Name: useridbyusernameview; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.useridbyusernameview AS
 SELECT users.user_id,
    users.username
   FROM public.users;


ALTER TABLE public.useridbyusernameview OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: contests contest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests ALTER COLUMN contest_id SET DEFAULT nextval('public.contests_contest_id_seq'::regclass);


--
-- Name: problems problem_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problems ALTER COLUMN problem_id SET DEFAULT nextval('public.problems_problem_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, user_id, contest_id, comment_desc) FROM stdin;
52	1	35	woah
37	1	31	hasd
38	1	31	as
41	1	31	tset
42	1	31	sdfdsa
44	1	36	how do you solve this?
50	1	35	hello world\n
55	1	27	I am admin
61	1	35	this looks so hard
63	1	67	this looks interesting
\.


--
-- Data for Name: contest_problem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contest_problem (contest_id, problem_id) FROM stdin;
27	40
27	41
30	45
30	46
30	47
31	48
35	51
35	52
36	53
67	90
67	91
\.


--
-- Data for Name: contests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contests (contest_id, contest_name, start_date, end_date) FROM stdin;
53	Codeforce Div 5	2022-12-10 10:00:00+00	2022-12-11 10:00:00+00
67	Demo Contest	2022-12-08 15:00:00+00	2022-12-08 22:00:00+00
27	acc2	2022-12-04 10:00:00+00	2022-12-05 11:00:00+00
30	Codeforces Div 2	2022-12-04 22:37:00+00	2022-12-05 00:00:00+00
31	Test Competition	2022-12-06 19:58:00+00	2022-12-07 10:00:00+00
34	Meta Hackerrcup 2022	2022-12-07 22:25:00+00	2022-12-07 23:00:00+00
35	Facebook	2022-12-07 22:37:00+00	2022-12-07 23:00:00+00
36	Amazon	2022-12-07 22:49:00+00	2022-12-07 23:00:00+00
47	Late night contest	2022-12-10 10:00:00+00	2022-12-10 11:00:00+00
\.


--
-- Data for Name: problems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.problems (problem_id, problem_name, problem_desc, problem_url) FROM stdin;
1	SlavicGs Favorite Problem	graph problem	https://codeforces.com/problemset/problem/1760/G
2	hi	beginner	https://google.com
37	two sum	d	
38	three sum		
39	four sum		
40	make a bot		
41	make a website		
42	j1	1	1
43	j2		
45	Problem A	easy	https://codeforces.com/contest/1760/problem/A
46	Problem B	easy	https://codeforces.com/contest/1760/problem/B
47	Problem C	C	https://codeforces.com/contest/1760/problem/C
48	a	a	
49	two sum	sd	
50	two sum	sd	
51	Jumbled Trees		https://codeforces.com/problemset/problem/1773/J
52	Hot and Cold		https://codeforces.com/problemset/problem/1773/H
53	The		
54	undefined	undefined	undefined
55	undefined	undefined	undefined
56	undefined	undefined	undefined
57	undefined	undefined	undefined
58	undefined	undefined	undefined
59	undefined	undefined	undefined
60	undefined	undefined	undefined
61	undefined	undefined	undefined
62	undefined	undefined	undefined
63	undefined	undefined	undefined
64	ASDF	FDSA	FDSA
65	TWO SUM	TWO SUM	google.com
66	undefined	undefined	undefined
67	undefined	undefined	undefined
68	Late night		google.com
69	undefined	undefined	undefined
70	Medium Number	easy	https://codeforces.com/contest/1760/problem/A
71	Binary Inversions	medium	https://codeforces.com/contest/1760/problem/E
72	Atilla Favorite Problem	easy	https://codeforces.com/contest/1760/problem/B
73	Advantage	easy	https://codeforces.com/contest/1760/problem/C
74	Challenging Valleys	medium	https://codeforces.com/contest/1760/problem/D
77	undefined	undefined	undefined
82	undefined	undefined	undefined
83	asd	asd	asd
84	asd	asd	asd
85	Two Sum	s	
86	Two Sum	s	
87	Two Sum	hello world	
88	Two Sum	classic easy problem	https://leetcode.com/problems/two-sum/
89	Lost Permutations	medium	https://codeforces.com/problemset/problem/1759/B
90	Two Sum	A classic easy leetcode problem	https://leetcode.com/problems/two-sum/
91	Lost Permutations	medium problem	https://codeforces.com/problemset/problem/1759/B
\.


--
-- Data for Name: user_contest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_contest (user_id, contest_id) FROM stdin;
1	27
1	30
1	34
1	36
1	53
1	67
40	53
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, firstname, lastname, isadmin) FROM stdin;
1	admin	$2b$10$TtHtNwZ.Hib9piyjs/hsce2xnMt.Pjjuc1u.6HvgTgRuMNZE3PRzy	admin	admin	t
37	elon@tesla.com	$2b$10$lF9vvX1WxG9qkcu9nr5NEeOjo08fB3lRLkDLtqqwuBnAgSeMy.4.u	Elon	Musk	f
40	xiaozhuoc1@gmail.com	$2b$10$UbEhX7Ps0fdi9KhSzYy18.ZAZq6iwFXOFP2n18PqHtUqbrMK6Wwvi	Danny	Chen	f
31	riceboishi@tamu.edu	$2b$10$6Tgoj3QW5ZomL.lBtQzghe4MIfuyQT6i7R52r5nYlCjwlVazU6ULC	Boyi	Shi	t
\.


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 64, true);


--
-- Name: contests_contest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contests_contest_id_seq', 67, true);


--
-- Name: problems_problem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problems_problem_id_seq', 91, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 40, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id, user_id, contest_id);


--
-- Name: contests contests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests
    ADD CONSTRAINT contests_pkey PRIMARY KEY (contest_id);


--
-- Name: problems problems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_pkey PRIMARY KEY (problem_id);


--
-- Name: user_contest user_contest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_contest
    ADD CONSTRAINT user_contest_pkey PRIMARY KEY (user_id, contest_id);


--
-- Name: users username_uniqueness; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_uniqueness UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX username_index ON public.users USING btree (username);


--
-- Name: contest_problem contest_problem_contest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_problem
    ADD CONSTRAINT contest_problem_contest_id_fkey FOREIGN KEY (contest_id) REFERENCES public.contests(contest_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contest_problem contest_problem_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contest_problem
    ADD CONSTRAINT contest_problem_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(problem_id) ON UPDATE CASCADE;


--
-- Name: user_contest fk_contest; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_contest
    ADD CONSTRAINT fk_contest FOREIGN KEY (contest_id) REFERENCES public.contests(contest_id);


--
-- Name: comments fk_contest; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_contest FOREIGN KEY (contest_id) REFERENCES public.contests(contest_id);


--
-- Name: user_contest fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_contest
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: comments fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

