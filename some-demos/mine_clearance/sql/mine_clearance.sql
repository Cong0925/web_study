/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : mine_clearance

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 01/02/2024 15:09:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for advancedranking
-- ----------------------------
DROP TABLE IF EXISTS `advancedranking`;
CREATE TABLE `advancedranking`  (
  `RankID` int NOT NULL AUTO_INCREMENT,
  `ResultID` int NULL DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE,
  INDEX `ResultID`(`ResultID` ASC) USING BTREE,
  CONSTRAINT `advancedranking_ibfk_1` FOREIGN KEY (`ResultID`) REFERENCES `gameresult` (`ResultID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of advancedranking
-- ----------------------------
INSERT INTO `advancedranking` VALUES (1, 95);
INSERT INTO `advancedranking` VALUES (2, 96);
INSERT INTO `advancedranking` VALUES (3, 97);
INSERT INTO `advancedranking` VALUES (4, 98);
INSERT INTO `advancedranking` VALUES (5, 99);
INSERT INTO `advancedranking` VALUES (6, 100);
INSERT INTO `advancedranking` VALUES (7, 101);
INSERT INTO `advancedranking` VALUES (8, 102);
INSERT INTO `advancedranking` VALUES (9, 103);
INSERT INTO `advancedranking` VALUES (10, 104);
INSERT INTO `advancedranking` VALUES (11, 105);
INSERT INTO `advancedranking` VALUES (12, 106);
INSERT INTO `advancedranking` VALUES (13, 107);
INSERT INTO `advancedranking` VALUES (14, 108);
INSERT INTO `advancedranking` VALUES (15, 109);
INSERT INTO `advancedranking` VALUES (16, 110);
INSERT INTO `advancedranking` VALUES (17, 111);
INSERT INTO `advancedranking` VALUES (18, 112);
INSERT INTO `advancedranking` VALUES (19, 113);
INSERT INTO `advancedranking` VALUES (20, 114);
INSERT INTO `advancedranking` VALUES (21, 115);
INSERT INTO `advancedranking` VALUES (22, 116);
INSERT INTO `advancedranking` VALUES (23, 117);
INSERT INTO `advancedranking` VALUES (24, 118);
INSERT INTO `advancedranking` VALUES (25, 119);
INSERT INTO `advancedranking` VALUES (26, 120);
INSERT INTO `advancedranking` VALUES (27, 121);
INSERT INTO `advancedranking` VALUES (28, 122);
INSERT INTO `advancedranking` VALUES (29, 123);
INSERT INTO `advancedranking` VALUES (30, 124);
INSERT INTO `advancedranking` VALUES (31, 125);
INSERT INTO `advancedranking` VALUES (32, 126);
INSERT INTO `advancedranking` VALUES (33, 127);
INSERT INTO `advancedranking` VALUES (34, 128);
INSERT INTO `advancedranking` VALUES (35, 129);
INSERT INTO `advancedranking` VALUES (36, 130);
INSERT INTO `advancedranking` VALUES (37, 131);
INSERT INTO `advancedranking` VALUES (38, 132);
INSERT INTO `advancedranking` VALUES (39, 133);
INSERT INTO `advancedranking` VALUES (40, 134);
INSERT INTO `advancedranking` VALUES (41, 135);
INSERT INTO `advancedranking` VALUES (42, 136);
INSERT INTO `advancedranking` VALUES (43, 137);
INSERT INTO `advancedranking` VALUES (44, 138);
INSERT INTO `advancedranking` VALUES (45, 139);
INSERT INTO `advancedranking` VALUES (46, 140);
INSERT INTO `advancedranking` VALUES (47, 141);
INSERT INTO `advancedranking` VALUES (48, 142);
INSERT INTO `advancedranking` VALUES (49, 143);
INSERT INTO `advancedranking` VALUES (50, 144);
INSERT INTO `advancedranking` VALUES (51, 180);
INSERT INTO `advancedranking` VALUES (52, 184);

-- ----------------------------
-- Table structure for beginnerranking
-- ----------------------------
DROP TABLE IF EXISTS `beginnerranking`;
CREATE TABLE `beginnerranking`  (
  `RankID` int NOT NULL AUTO_INCREMENT,
  `ResultID` int NULL DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE,
  INDEX `ResultID`(`ResultID` ASC) USING BTREE,
  CONSTRAINT `beginnerranking_ibfk_1` FOREIGN KEY (`ResultID`) REFERENCES `gameresult` (`ResultID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 107 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of beginnerranking
-- ----------------------------
INSERT INTO `beginnerranking` VALUES (1, 1);
INSERT INTO `beginnerranking` VALUES (32, 1);
INSERT INTO `beginnerranking` VALUES (2, 2);
INSERT INTO `beginnerranking` VALUES (33, 2);
INSERT INTO `beginnerranking` VALUES (3, 3);
INSERT INTO `beginnerranking` VALUES (34, 3);
INSERT INTO `beginnerranking` VALUES (4, 4);
INSERT INTO `beginnerranking` VALUES (35, 4);
INSERT INTO `beginnerranking` VALUES (5, 5);
INSERT INTO `beginnerranking` VALUES (36, 5);
INSERT INTO `beginnerranking` VALUES (6, 6);
INSERT INTO `beginnerranking` VALUES (37, 6);
INSERT INTO `beginnerranking` VALUES (7, 7);
INSERT INTO `beginnerranking` VALUES (38, 7);
INSERT INTO `beginnerranking` VALUES (8, 8);
INSERT INTO `beginnerranking` VALUES (39, 8);
INSERT INTO `beginnerranking` VALUES (9, 9);
INSERT INTO `beginnerranking` VALUES (40, 9);
INSERT INTO `beginnerranking` VALUES (10, 10);
INSERT INTO `beginnerranking` VALUES (41, 10);
INSERT INTO `beginnerranking` VALUES (11, 11);
INSERT INTO `beginnerranking` VALUES (42, 11);
INSERT INTO `beginnerranking` VALUES (12, 12);
INSERT INTO `beginnerranking` VALUES (43, 12);
INSERT INTO `beginnerranking` VALUES (13, 13);
INSERT INTO `beginnerranking` VALUES (44, 13);
INSERT INTO `beginnerranking` VALUES (14, 14);
INSERT INTO `beginnerranking` VALUES (45, 14);
INSERT INTO `beginnerranking` VALUES (15, 15);
INSERT INTO `beginnerranking` VALUES (46, 15);
INSERT INTO `beginnerranking` VALUES (16, 16);
INSERT INTO `beginnerranking` VALUES (47, 16);
INSERT INTO `beginnerranking` VALUES (17, 17);
INSERT INTO `beginnerranking` VALUES (48, 17);
INSERT INTO `beginnerranking` VALUES (18, 18);
INSERT INTO `beginnerranking` VALUES (49, 18);
INSERT INTO `beginnerranking` VALUES (19, 19);
INSERT INTO `beginnerranking` VALUES (50, 19);
INSERT INTO `beginnerranking` VALUES (20, 20);
INSERT INTO `beginnerranking` VALUES (51, 20);
INSERT INTO `beginnerranking` VALUES (21, 21);
INSERT INTO `beginnerranking` VALUES (52, 21);
INSERT INTO `beginnerranking` VALUES (22, 22);
INSERT INTO `beginnerranking` VALUES (53, 22);
INSERT INTO `beginnerranking` VALUES (23, 23);
INSERT INTO `beginnerranking` VALUES (54, 23);
INSERT INTO `beginnerranking` VALUES (24, 24);
INSERT INTO `beginnerranking` VALUES (55, 24);
INSERT INTO `beginnerranking` VALUES (25, 25);
INSERT INTO `beginnerranking` VALUES (56, 25);
INSERT INTO `beginnerranking` VALUES (26, 26);
INSERT INTO `beginnerranking` VALUES (57, 26);
INSERT INTO `beginnerranking` VALUES (27, 27);
INSERT INTO `beginnerranking` VALUES (58, 27);
INSERT INTO `beginnerranking` VALUES (28, 28);
INSERT INTO `beginnerranking` VALUES (59, 28);
INSERT INTO `beginnerranking` VALUES (29, 29);
INSERT INTO `beginnerranking` VALUES (60, 29);
INSERT INTO `beginnerranking` VALUES (30, 30);
INSERT INTO `beginnerranking` VALUES (61, 30);
INSERT INTO `beginnerranking` VALUES (63, 32);
INSERT INTO `beginnerranking` VALUES (64, 33);
INSERT INTO `beginnerranking` VALUES (65, 34);
INSERT INTO `beginnerranking` VALUES (66, 35);
INSERT INTO `beginnerranking` VALUES (67, 36);
INSERT INTO `beginnerranking` VALUES (68, 37);
INSERT INTO `beginnerranking` VALUES (69, 38);
INSERT INTO `beginnerranking` VALUES (70, 39);
INSERT INTO `beginnerranking` VALUES (71, 40);
INSERT INTO `beginnerranking` VALUES (72, 41);
INSERT INTO `beginnerranking` VALUES (73, 42);
INSERT INTO `beginnerranking` VALUES (74, 43);
INSERT INTO `beginnerranking` VALUES (75, 44);
INSERT INTO `beginnerranking` VALUES (76, 45);
INSERT INTO `beginnerranking` VALUES (77, 46);
INSERT INTO `beginnerranking` VALUES (78, 47);
INSERT INTO `beginnerranking` VALUES (79, 48);
INSERT INTO `beginnerranking` VALUES (80, 49);
INSERT INTO `beginnerranking` VALUES (81, 50);
INSERT INTO `beginnerranking` VALUES (82, 51);
INSERT INTO `beginnerranking` VALUES (83, 52);
INSERT INTO `beginnerranking` VALUES (84, 53);
INSERT INTO `beginnerranking` VALUES (85, 54);
INSERT INTO `beginnerranking` VALUES (86, 55);
INSERT INTO `beginnerranking` VALUES (87, 56);
INSERT INTO `beginnerranking` VALUES (88, 57);
INSERT INTO `beginnerranking` VALUES (89, 58);
INSERT INTO `beginnerranking` VALUES (90, 59);
INSERT INTO `beginnerranking` VALUES (91, 60);
INSERT INTO `beginnerranking` VALUES (92, 61);
INSERT INTO `beginnerranking` VALUES (93, 62);
INSERT INTO `beginnerranking` VALUES (94, 63);
INSERT INTO `beginnerranking` VALUES (95, 64);
INSERT INTO `beginnerranking` VALUES (96, 65);
INSERT INTO `beginnerranking` VALUES (97, 66);
INSERT INTO `beginnerranking` VALUES (98, 67);
INSERT INTO `beginnerranking` VALUES (99, 68);
INSERT INTO `beginnerranking` VALUES (100, 69);
INSERT INTO `beginnerranking` VALUES (101, 70);
INSERT INTO `beginnerranking` VALUES (102, 71);
INSERT INTO `beginnerranking` VALUES (103, 177);
INSERT INTO `beginnerranking` VALUES (104, 179);
INSERT INTO `beginnerranking` VALUES (105, 181);
INSERT INTO `beginnerranking` VALUES (106, 182);

-- ----------------------------
-- Table structure for gameresult
-- ----------------------------
DROP TABLE IF EXISTS `gameresult`;
CREATE TABLE `gameresult`  (
  `ResultID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NULL DEFAULT NULL,
  `ChallengeTime` decimal(10, 3) NULL DEFAULT NULL,
  `CreationDate` date NULL DEFAULT NULL,
  `Difficulty` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ResultID`) USING BTREE,
  INDEX `UserID`(`UserID` ASC) USING BTREE,
  CONSTRAINT `gameresult_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 185 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gameresult
-- ----------------------------
INSERT INTO `gameresult` VALUES (1, 9, 0.558, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (2, 13, 116.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (3, 48, 116.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (4, 42, 77.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (5, 48, 114.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (6, 35, 102.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (7, 22, 64.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (8, 1, 112.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (9, 16, 114.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (10, 31, 77.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (11, 32, 77.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (12, 28, 110.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (13, 29, 77.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (14, 37, 105.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (15, 32, 111.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (16, 22, 90.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (17, 14, 107.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (18, 9, 85.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (19, 32, 111.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (20, 19, 78.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (21, 20, 119.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (22, 40, 116.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (23, 19, 118.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (24, 38, 112.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (25, 3, 100.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (26, 9, 108.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (27, 28, 77.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (28, 40, 66.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (29, 6, 76.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (30, 49, 64.000, '2024-01-31', '初级');
INSERT INTO `gameresult` VALUES (32, 49, 147.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (33, 14, 123.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (34, 4, 110.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (35, 47, 173.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (36, 44, 142.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (37, 14, 146.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (38, 16, 145.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (39, 9, 179.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (40, 24, 120.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (41, 15, 127.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (42, 13, 172.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (43, 45, 145.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (44, 24, 129.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (45, 42, 161.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (46, 26, 103.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (47, 12, 151.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (48, 38, 145.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (49, 43, 127.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (50, 28, 127.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (51, 25, 102.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (52, 13, 164.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (53, 19, 123.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (54, 38, 143.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (55, 36, 161.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (56, 42, 158.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (57, 16, 109.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (58, 9, 110.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (59, 30, 111.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (60, 22, 130.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (61, 47, 118.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (62, 40, 177.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (63, 24, 131.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (64, 46, 98.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (65, 38, 134.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (66, 10, 129.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (67, 34, 177.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (68, 44, 128.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (69, 27, 116.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (70, 48, 162.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (71, 10, 138.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (95, 7, 240.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (96, 32, 132.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (97, 34, 236.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (98, 44, 166.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (99, 18, 185.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (100, 36, 221.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (101, 7, 129.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (102, 3, 233.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (103, 31, 143.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (104, 9, 143.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (105, 25, 223.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (106, 42, 186.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (107, 15, 212.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (108, 50, 193.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (109, 5, 193.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (110, 40, 130.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (111, 4, 128.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (112, 9, 191.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (113, 24, 186.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (114, 20, 144.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (115, 45, 217.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (116, 21, 191.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (117, 39, 122.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (118, 41, 234.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (119, 18, 228.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (120, 23, 180.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (121, 11, 180.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (122, 46, 238.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (123, 12, 141.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (124, 12, 182.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (125, 49, 153.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (126, 25, 193.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (127, 31, 135.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (128, 43, 219.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (129, 32, 193.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (130, 10, 132.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (131, 48, 168.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (132, 9, 198.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (133, 38, 213.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (134, 33, 227.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (135, 28, 124.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (136, 27, 185.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (137, 7, 123.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (138, 37, 185.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (139, 28, 134.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (140, 48, 158.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (141, 40, 238.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (142, 28, 214.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (143, 16, 136.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (144, 39, 170.000, '2024-01-31', '高级');
INSERT INTO `gameresult` VALUES (158, 55, 1.781, NULL, '中级');
INSERT INTO `gameresult` VALUES (159, 55, 2.450, NULL, '中级');
INSERT INTO `gameresult` VALUES (160, 55, 0.450, NULL, '中级');
INSERT INTO `gameresult` VALUES (161, 55, 0.450, NULL, '中级');
INSERT INTO `gameresult` VALUES (162, 55, 0.450, NULL, '中级');
INSERT INTO `gameresult` VALUES (163, 55, 0.450, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (164, 55, 3.271, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (165, 55, 4.810, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (166, 55, 2.470, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (167, 55, 0.470, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (168, 55, 0.000, '2024-01-31', '中级');
INSERT INTO `gameresult` VALUES (169, 55, 0.000, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (170, 55, 1.690, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (171, 55, 0.690, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (172, 55, 0.000, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (173, 55, 4.800, '2024-02-01', '高级');
INSERT INTO `gameresult` VALUES (174, 55, 1.680, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (175, 55, 2.262, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (176, 55, 1.870, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (177, 55, 64.210, '2024-02-01', '初级');
INSERT INTO `gameresult` VALUES (178, 55, 1.431, '2024-02-01', 'easy');
INSERT INTO `gameresult` VALUES (179, 55, 2.692, '2024-02-01', 'easy');
INSERT INTO `gameresult` VALUES (180, 55, 0.600, '2024-02-01', '高级');
INSERT INTO `gameresult` VALUES (181, 57, 2.821, '2024-02-01', 'easy');
INSERT INTO `gameresult` VALUES (182, 57, 0.890, '2024-02-01', 'easy');
INSERT INTO `gameresult` VALUES (183, 57, 0.000, '2024-02-01', '中级');
INSERT INTO `gameresult` VALUES (184, 57, 4.142, '2024-02-01', '高级');

-- ----------------------------
-- Table structure for intermediateranking
-- ----------------------------
DROP TABLE IF EXISTS `intermediateranking`;
CREATE TABLE `intermediateranking`  (
  `RankID` int NOT NULL AUTO_INCREMENT,
  `ResultID` int NULL DEFAULT NULL,
  PRIMARY KEY (`RankID`) USING BTREE,
  INDEX `ResultID`(`ResultID` ASC) USING BTREE,
  CONSTRAINT `intermediateranking_ibfk_1` FOREIGN KEY (`ResultID`) REFERENCES `gameresult` (`ResultID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of intermediateranking
-- ----------------------------
INSERT INTO `intermediateranking` VALUES (1, 176);
INSERT INTO `intermediateranking` VALUES (2, 183);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IPAddress` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'User1', '192.168.1.1');
INSERT INTO `user` VALUES (2, 'User2', '192.168.1.2');
INSERT INTO `user` VALUES (3, 'User3', '192.168.1.3');
INSERT INTO `user` VALUES (4, 'User4', '192.168.1.4');
INSERT INTO `user` VALUES (5, 'User5', '192.168.1.5');
INSERT INTO `user` VALUES (6, 'User6', '192.168.1.6');
INSERT INTO `user` VALUES (7, 'User7', '192.168.1.7');
INSERT INTO `user` VALUES (8, 'User8', '192.168.1.8');
INSERT INTO `user` VALUES (9, 'User9', '192.168.1.9');
INSERT INTO `user` VALUES (10, 'User10', '192.168.1.10');
INSERT INTO `user` VALUES (11, 'User11', '192.168.1.11');
INSERT INTO `user` VALUES (12, 'User12', '192.168.1.12');
INSERT INTO `user` VALUES (13, 'User13', '192.168.1.13');
INSERT INTO `user` VALUES (14, 'User14', '192.168.1.14');
INSERT INTO `user` VALUES (15, 'User15', '192.168.1.15');
INSERT INTO `user` VALUES (16, 'User16', '192.168.1.16');
INSERT INTO `user` VALUES (17, 'User17', '192.168.1.17');
INSERT INTO `user` VALUES (18, 'User18', '192.168.1.18');
INSERT INTO `user` VALUES (19, 'User19', '192.168.1.19');
INSERT INTO `user` VALUES (20, 'User20', '192.168.1.20');
INSERT INTO `user` VALUES (21, 'User21', '192.168.1.21');
INSERT INTO `user` VALUES (22, 'User22', '192.168.1.22');
INSERT INTO `user` VALUES (23, 'User23', '192.168.1.23');
INSERT INTO `user` VALUES (24, 'User24', '192.168.1.24');
INSERT INTO `user` VALUES (25, 'User25', '192.168.1.25');
INSERT INTO `user` VALUES (26, 'User26', '192.168.1.26');
INSERT INTO `user` VALUES (27, 'User27', '192.168.1.27');
INSERT INTO `user` VALUES (28, 'User28', '192.168.1.28');
INSERT INTO `user` VALUES (29, 'User29', '192.168.1.29');
INSERT INTO `user` VALUES (30, 'User30', '192.168.1.30');
INSERT INTO `user` VALUES (31, 'User31', '192.168.1.31');
INSERT INTO `user` VALUES (32, 'User32', '192.168.1.32');
INSERT INTO `user` VALUES (33, 'User33', '192.168.1.33');
INSERT INTO `user` VALUES (34, 'User34', '192.168.1.34');
INSERT INTO `user` VALUES (35, 'User35', '192.168.1.35');
INSERT INTO `user` VALUES (36, 'User36', '192.168.1.36');
INSERT INTO `user` VALUES (37, 'User37', '192.168.1.37');
INSERT INTO `user` VALUES (38, 'User38', '192.168.1.38');
INSERT INTO `user` VALUES (39, 'User39', '192.168.1.39');
INSERT INTO `user` VALUES (40, 'User40', '192.168.1.40');
INSERT INTO `user` VALUES (41, 'User41', '192.168.1.41');
INSERT INTO `user` VALUES (42, 'User42', '192.168.1.42');
INSERT INTO `user` VALUES (43, 'User43', '192.168.1.43');
INSERT INTO `user` VALUES (44, 'User44', '192.168.1.44');
INSERT INTO `user` VALUES (45, 'User45', '192.168.1.45');
INSERT INTO `user` VALUES (46, 'User46', '192.168.1.46');
INSERT INTO `user` VALUES (47, 'User47', '192.168.1.47');
INSERT INTO `user` VALUES (48, 'User48', '192.168.1.48');
INSERT INTO `user` VALUES (49, 'User49', '192.168.1.49');
INSERT INTO `user` VALUES (50, 'User50', '192.168.1.50');
INSERT INTO `user` VALUES (51, 'xhc', '');
INSERT INTO `user` VALUES (52, 'qwer', '');
INSERT INTO `user` VALUES (53, 'xhc', '');
INSERT INTO `user` VALUES (54, 'xhc', '');
INSERT INTO `user` VALUES (55, 'xhc', '');
INSERT INTO `user` VALUES (56, 'qwer', '');
INSERT INTO `user` VALUES (57, 'asdf', '');

-- ----------------------------
-- View structure for advancedrankingview
-- ----------------------------
DROP VIEW IF EXISTS `advancedrankingview`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `advancedrankingview` AS select `ar`.`RankID` AS `RankID`,`u`.`UserID` AS `UserID`,`u`.`Username` AS `Username`,`gr`.`ChallengeTime` AS `ChallengeTime`,`gr`.`CreationDate` AS `CreationDate`,row_number() OVER (ORDER BY `gr`.`ChallengeTime` )  AS `UserRank` from ((`advancedranking` `ar` join `gameresult` `gr` on((`ar`.`ResultID` = `gr`.`ResultID`))) join `user` `u` on((`gr`.`UserID` = `u`.`UserID`)));

-- ----------------------------
-- View structure for beginnerrankingview
-- ----------------------------
DROP VIEW IF EXISTS `beginnerrankingview`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `beginnerrankingview` AS select `br`.`RankID` AS `RankID`,`u`.`UserID` AS `UserID`,`u`.`Username` AS `Username`,`gr`.`ChallengeTime` AS `ChallengeTime`,`gr`.`CreationDate` AS `CreationDate`,row_number() OVER (ORDER BY `gr`.`ChallengeTime` )  AS `UserRank` from ((`beginnerranking` `br` join `gameresult` `gr` on((`br`.`ResultID` = `gr`.`ResultID`))) join `user` `u` on((`gr`.`UserID` = `u`.`UserID`)));

-- ----------------------------
-- View structure for intermediaterankingview
-- ----------------------------
DROP VIEW IF EXISTS `intermediaterankingview`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `intermediaterankingview` AS select `ir`.`RankID` AS `RankID`,`u`.`UserID` AS `UserID`,`u`.`Username` AS `Username`,`gr`.`ChallengeTime` AS `ChallengeTime`,`gr`.`CreationDate` AS `CreationDate`,row_number() OVER (ORDER BY `gr`.`ChallengeTime` )  AS `UserRank` from ((`intermediateranking` `ir` join `gameresult` `gr` on((`ir`.`ResultID` = `gr`.`ResultID`))) join `user` `u` on((`gr`.`UserID` = `u`.`UserID`)));

SET FOREIGN_KEY_CHECKS = 1;
