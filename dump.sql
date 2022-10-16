--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."usersUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usersUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersUrls_id_seq" OWNED BY public."usersUrls".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls" ALTER COLUMN id SET DEFAULT nextval('public."usersUrls_id_seq"'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (8, 1, '48116acf-43d1-42a5-992d-f521bf498ebd', '2022-10-12 17:06:15.267692');
INSERT INTO public.sessions VALUES (9, 2, '4e2c985a-b3d2-4311-8623-52c6592ba234', '2022-10-15 22:46:04.818857');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'victor', 'vhs@teste.com', '$2b$10$hPGethK842LugH88jsoVfuuk8IpRSuaR3B6sbpaV0nrNul7SAwX9a', '2022-10-12 14:55:30.159888');
INSERT INTO public.users VALUES (2, 'João', 'joao@driven.com.br', '$2b$10$bl1UJk/rASzDATQchGpPSuoBKF5idIlGf/AvRpc3DpujeRZY7Xu/W', '2022-10-13 00:56:25.387784');


--
-- Data for Name: usersUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."usersUrls" VALUES (12, 1, 'La-M5fWTuE', 'https://cdn.discordapp.com/attachments/509524382914183182/1028545159551533098/unknown.png', 4, '2022-10-15 22:59:43.237114');
INSERT INTO public."usersUrls" VALUES (14, 1, '7iyinP3nS0', 'https://cdn.discordapp.com/attachments/509524382914183182/1028539428676837396/unknown.png', 3, '2022-10-15 23:00:24.822909');
INSERT INTO public."usersUrls" VALUES (15, 1, 'Fw8bRKzN4T', 'https://cdn.discordapp.com/attachments/509524382914183182/1027716248752099379/unknown.png', 6, '2022-10-15 23:01:06.531663');
INSERT INTO public."usersUrls" VALUES (16, 2, 'G79CoMm16-', 'https://media.tenor.com/4F6LXZy2_4kAAAAd/vegeta-under-the-rain.gif', 4, '2022-10-15 23:02:06.845417');
INSERT INTO public."usersUrls" VALUES (17, 2, 'QkxpuWC9O7', 'https://media.tenor.com/9jmRvdP8yY4AAAAC/steven-he-asian.gif', 1, '2022-10-15 23:02:55.883036');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: usersUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersUrls_id_seq"', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions sessions_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");


--
-- Name: usersUrls usersUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_pkey" PRIMARY KEY (id);


--
-- Name: usersUrls usersUrls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: usersUrls usersUrls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."usersUrls"
    ADD CONSTRAINT "usersUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

