-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 09:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires`) VALUES
(1, 'parttim663@gmail.com', '572683bb1eacff885da652ac11d37636a03e05ac', 1731226118354),
(2, 'parttim663@gmail.com', 'b8ba7e7abdeb5689923f947202cadcd780217a22', 1731272891142),
(3, 'parttim663@gmail.com', '8fed48f973afc1c3c2660e493245a02d1ee902f9', 1731274129676),
(4, 'parttim663@gmail.com', '526ec8e56325168d753ce6e6edcb1c21cf36daae', 1731274275002),
(5, 'parttim663@gmail.com', '146c002da501c716e0d7566aedebf9a5c4f441ec', 1731275005973),
(6, 'parttim663@gmail.com', '7d2cff5839b34a484c5b9fd6298dc5a648383721', 1731275015756),
(7, 'voxmail31@gmail.com', 'a4034869d93927b8e523dbf1deb37c1533acd375', 1731275043732),
(8, 'voxmail31@gmail.com', '4da77726dcab6aead2e8bf89843de58fa41b2dae', 1731275048964),
(9, 'saifmoahd4422@gmail.com', 'cbb8084423b37ea628ab97fd709cfd29dabb20b8', 1731310467208),
(10, 'saifmoahd4422@gmail.com', 'b90e797d562cdec040b1888f23b4584ae0b41729', 1731310469273),
(11, 'voxmail31@gmail.com', 'a1d0c6332964db1d2606fd0abdbdc1925e33c7c0', 1731310502576),
(12, 'juhit8574@gmail.com', 'ec472c41679046afeb62b3e6df76707d0cb09990', 1733724557099),
(13, 'juhit8574@gmail.com', 'a53822a31950d8d900aca8eaf02bef8d6f426ea0', 1733724582112),
(14, 'juhit8574@gmail.com', '5d5667e4fcda60f05b22170b36539434e4865227', 1733724583100),
(15, 'saifmohd4422@gmail.com', '0c8822cfa115a16f717f809d9ac085f51d1bd722', 1733726334363),
(16, 'saifmohd4422@gmail.com', '8b8620d6bbf49e63af176cbaf478035c94e44429', 1733728368501);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone`, `password`, `created_at`) VALUES
(12, 'juhi', 'juhit8574@gmail.com', '8574249710', '$2b$10$MgVzbHZdcCPC1PWpbV4lzOJbyQp70.YZY3iGlasAnU5.jIO4eyO0y', '2024-12-09 05:08:40'),
(13, 'Saif', 'saifmohd4422@gmail.com', '7703020112', '$2b$10$SCVPkbLKSF8zDF.VdCgAu.7wWdQyqIC57IRq9lyOoTyz9kAi0m6Wm', '2024-12-09 06:17:20'),
(14, '1234', '1234@gmail.com', '1234567890', '$2b$10$QGrv0CIs8GpPNjBumO6.5u3vyX6D2HJtNcIgzWdu3cu.3xsRcLOIy', '2024-12-09 06:19:08'),
(16, '1234', 'parttime663@gmail.com', '7703020112', '$2b$10$UjhxWJEMfqqjID30Q/xf.umjP.wUJEvHcigDtwwU4mLIwqoseeJRG', '2024-12-09 06:27:43'),
(18, '1234', 'saifbinnadeem@gmail.com', '9696862558', '$2b$10$de8Gg39cYxJ5dtxkBnMHwOZLjCbzH1vWRzWZrSmWeknCFagcTajuO', '2024-12-09 06:41:15'),
(19, '123', '123@asd.com', '4567890987', '$2b$10$8KNiFmJTm2pX8pFMfhIYmuNWeW5GZJBtkgBwwEYrGl41PLtnrNd82', '2024-12-09 06:49:50'),
(22, 'Tara', 'juhit8@gmail.com', '8574249710', '$2b$10$RQv8O/tpaD2NAR9tcpc7E.mGHYmoLUoUaZlae82D1JsQLf4Pc8iRW', '2025-02-28 15:28:56'),
(23, 'Saif', 'parttim663@gmail.com', '8574249710', '$2b$10$rrWM5sOG73C.L1hZUlcugOci4nHMcjRrpSyG5BuoeC9FHLZEPDXF2', '2025-03-04 07:03:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
