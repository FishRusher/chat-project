-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 02, 2023 at 11:04 AM
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
-- Dumping data for table `chatroom_message`
--

INSERT INTO `chatroom_message` (`message_id`, `sender_id`, `receiver_id`, `message_content`, `message_date`) VALUES
(1, 2, 1, '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur ex nec urna euismod, eget sodales nisi rutrum. Fusce cursus, odio ac rutrum ultricies, sem orci egestas dui, a malesuada quam arcu id libero.', '2023-11-02 08:35:01'),
(2, 2, 1, 'Nulla eu erat eget tortor eleifend fringilla eget varius diam. Pellentesque eget augue eu dolor convallis venenatis a a ligula. Morbi sodales efficitur felis, at vulputate nisl egestas a. Aliquam commodo felis ac dignissim egestas.', '2023-11-02 08:35:16'),
(3, 2, 1, 'Nunc sit amet vehicula ex, vel dictum metus. Suspendisse accumsan magna ac maximus commodo. Nam urna lectus, sodales ullamcorper fringilla eget, sollicitudin sit amet tellus. Maecenas sodales massa dolor, vel congue orci pellentesque at. Nulla facilisi. Pellentesque et ipsum aliquam, mattis massa sit amet, bibendum velit. In hac habitasse platea dictumst. Nullam velit enim, suscipit vitae cursus ut, cursus placerat ex.', '2023-11-02 08:35:35'),
(4, 1, 2, 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer purus lacus, posuere non purus non, ultrices dapibus lectus. Vivamus a lectus non tortor mattis eleifend eget ut urna. Proin in nisi nec ante aliquam feugiat. Mauris ultrices, metus sit amet gravida euismod, neque neque convallis orci, nec bibendum nisi massa in erat. Mauris eget euismod massa. Vivamus augue massa, ultrices quis scelerisque in, viverra vel neque.', '2023-11-02 08:36:17'),
(5, 1, 3, 'Praesent sit amet ullamcorper lorem, in interdum lectus. Phasellus metus tellus, tincidunt quis ex vitae, luctus pellentesque diam. Donec ac feugiat erat, blandit rutrum ligula.', '2023-11-02 08:37:16'),
(6, 2, 1, 'Duis rhoncus diam quis pharetra blandit. Proin consectetur sem a justo sollicitudin maximus. Duis nibh nisi, lacinia et neque in, tincidunt tempus enim. Curabitur tincidunt purus mi, ac tincidunt nulla mattis non. Vestibulum dignissim dignissim risus. Quisque eu lobortis purus, et ornare leo.', '2023-11-02 08:37:34'),
(7, 3, 2, 'Cras hendrerit aliquam euismod. Cras et nisl sollicitudin, finibus ipsum vel, volutpat metus. Quisque eget lectus viverra, tincidunt purus ut, iaculis ligula. Sed id facilisis nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam dignissim metus at nunc laoreet auctor. Quisque at tincidunt enim.', '2023-11-02 08:38:48'),
(8, 3, 1, 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin at elementum turpis. Vestibulum iaculis libero turpis, id ultrices dolor maximus eu.', '2023-11-02 08:39:13'),
(9, 2, 3, 'Phasellus eu laoreet risus. Aliquam id enim ipsum. Nulla nec pretium urna, ac egestas lacus. Fusce dictum molestie interdum.', '2023-11-02 08:39:29');

-- --------------------------------------------------------

--
-- Dumping data for table `forwarded_message`
--

INSERT INTO `forwarded_message` (`forwarded_message_id`, `message_id`, `sender_id`, `receiver_id`, `message_date`) VALUES
(1, 2, 1, 3, '2023-11-02 08:36:34'),
(2, 4, 2, 3, '2023-11-02 08:38:12'),
(3, 5, 3, 2, '2023-11-02 08:38:52'),
(4, 9, 3, 1, '2023-11-02 08:39:35'),
(5, 7, 2, 1, '2023-11-02 08:40:03');

-- --------------------------------------------------------

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_nick`, `user_password`) VALUES
(1, 'JanKowalski', 'cc03e747a6afbbcbf8be7668acfebee5'),
(2, 'AdamNowak', 'cc03e747a6afbbcbf8be7668acfebee5'),
(3, 'CristianoRonaldo', 'cc03e747a6afbbcbf8be7668acfebee5');


ALTER TABLE `chatroom_message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `forwarded_message`
--
ALTER TABLE `forwarded_message`
  MODIFY `forwarded_message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
