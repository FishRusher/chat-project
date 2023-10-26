-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Paź 26, 2023 at 09:54 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-project`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chatroom_message`
--

CREATE TABLE `chatroom_message` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_content` text NOT NULL,
  `message_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_polish_ci;

--
-- Dumping data for table `chatroom_message`
--

INSERT INTO `chatroom_message` (`message_id`, `sender_id`, `receiver_id`, `message_content`, `message_date`) VALUES
(1, 1, 2, 'asd', '2023-10-25 08:26:22'),
(2, 2, 1, 'soiema', '2023-10-25 09:58:58'),
(3, 1, 2, 'test', '2023-10-25 10:09:18'),
(4, 2, 1, 'soiema', '2023-10-25 10:09:22'),
(5, 2, 1, 'soiema', '2023-10-25 10:09:22'),
(6, 2, 1, 'soiema', '2023-10-25 10:09:23'),
(7, 2, 1, 'soiema', '2023-10-25 10:09:23'),
(8, 2, 1, 'soiema', '2023-10-25 10:09:23');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `forwarded_message`
--

CREATE TABLE `forwarded_message` (
  `forwarded_message_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_nick` varchar(30) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_nick`, `user_password`) VALUES
(1, 'test1', '202cb962ac59075b964b07152d234b70'),
(2, 'test2', '202cb962ac59075b964b07152d234b70');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chatroom_message`
--
ALTER TABLE `chatroom_message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indeksy dla tabeli `forwarded_message`
--
ALTER TABLE `forwarded_message`
  ADD PRIMARY KEY (`forwarded_message_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatroom_message`
--
ALTER TABLE `chatroom_message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forwarded_message`
--
ALTER TABLE `forwarded_message`
  MODIFY `forwarded_message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
