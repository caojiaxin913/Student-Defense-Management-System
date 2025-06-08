/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : score_system

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 09/05/2023 22:34:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for group_student
-- ----------------------------
DROP TABLE IF EXISTS `group_student`;
CREATE TABLE `group_student`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `group_id` int(20) NULL DEFAULT NULL COMMENT '答辩小组id',
  `student_id` int(20) NULL DEFAULT NULL COMMENT '学生id',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生姓名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group_student
-- ----------------------------

-- ----------------------------
-- Table structure for group_teacher
-- ----------------------------
DROP TABLE IF EXISTS `group_teacher`;
CREATE TABLE `group_teacher`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `group_id` int(20) NULL DEFAULT NULL COMMENT '答辩小组id',
  `teacher_id` int(20) NULL DEFAULT NULL COMMENT '教师id',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师姓名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group_teacher
-- ----------------------------
INSERT INTO `group_teacher` VALUES (28, 5, 5, NULL);
INSERT INTO `group_teacher` VALUES (29, 5, 7, NULL);
INSERT INTO `group_teacher` VALUES (30, 5, 25, NULL);
INSERT INTO `group_teacher` VALUES (37, 7, 26, NULL);
INSERT INTO `group_teacher` VALUES (38, 7, 27, NULL);
INSERT INTO `group_teacher` VALUES (39, 7, 28, NULL);
INSERT INTO `group_teacher` VALUES (40, 10, 29, NULL);
INSERT INTO `group_teacher` VALUES (41, 10, 30, NULL);
INSERT INTO `group_teacher` VALUES (42, 10, 31, NULL);
INSERT INTO `group_teacher` VALUES (49, 11, 29, NULL);
INSERT INTO `group_teacher` VALUES (50, 11, 30, NULL);
INSERT INTO `group_teacher` VALUES (51, 11, 31, NULL);

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups`  (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '答辩小组id',
  `name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '组名',
  `place` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '答辩地点',
  `major` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专业',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES (5, 'WEB开发组', 'J04 B211', '数字媒体技术');
INSERT INTO `groups` VALUES (7, '移动终端开发组', 'J04 B212', '数字媒体技术');
INSERT INTO `groups` VALUES (10, '平面设计组', 'J04 B202', '数字媒体技术');
INSERT INTO `groups` VALUES (11, '微电影组', 'J04 B205', '数字媒体技术');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '教师评分记录id',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `student_id` int(11) NULL DEFAULT NULL COMMENT '学生id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课题题目',
  `research_id` int(11) NULL DEFAULT NULL COMMENT '课题id',
  `date` datetime(0) NULL DEFAULT NULL COMMENT '答辩日期',
  `teacher_id` int(11) NULL DEFAULT NULL COMMENT '教师id',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师姓名',
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '答辩成绩',
  `suggestion` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '答辩意见和建议',
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int(1) NULL DEFAULT 0 COMMENT '状态',
  `group_id` int(20) NULL DEFAULT NULL COMMENT '小组id',
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '小组名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (19, '张三', 2, '基于vue+node.js+mysql的移动端毕设记录及评分系统', 2, NULL, 5, '李老师', '90', '测试测试测试', '无', 1, 5, 'WEB开发组');
INSERT INTO `record` VALUES (20, '张三', 2, '基于vue+node.js+mysql的移动端毕设记录及评分系统', 2, '2023-05-08 22:25:31', 7, '黄老师', '89', '达到要求', '', 1, 5, 'WEB开发组');
INSERT INTO `record` VALUES (21, '张三', 2, '基于vue+node.js+mysql的移动端毕设记录及评分系统', 2, '2023-05-09 01:18:18', 25, '马老师', '95', '测试测试测试', '测试', 1, 5, 'WEB开发组');
INSERT INTO `record` VALUES (22, '王哈哈', 6, '基于移动媒体的毕业设计答辩记录评分系统', 3, '2023-05-08 22:26:09', 26, '景老师', '', '', '', 0, 7, '移动终端开发组');
INSERT INTO `record` VALUES (23, '王哈哈', 6, '基于移动媒体的毕业设计答辩记录评分系统', 3, NULL, 27, '方老师', NULL, NULL, NULL, 0, 7, '移动终端开发组');
INSERT INTO `record` VALUES (24, '王哈哈', 6, '基于移动媒体的毕业设计答辩记录评分系统', 3, NULL, 28, '刘老师', NULL, NULL, NULL, 0, 7, '移动终端开发组');
INSERT INTO `record` VALUES (25, '刘建化', 32, '测试课题测试课题', 4, '2023-05-09 19:49:15', 5, '李老师', '89', '功能仍需完善', '无', 1, 5, 'WEB开发组');
INSERT INTO `record` VALUES (26, '刘建化', 32, '测试课题测试课题', 4, '2023-05-09 19:49:49', 7, '黄老师', '90', '测试', '测试', 1, 5, 'WEB开发组');
INSERT INTO `record` VALUES (27, '刘建化', 32, '测试课题测试课题', 4, '2023-05-09 19:50:12', 25, '马老师', '88', '测试', '测试', 1, 5, 'WEB开发组');

-- ----------------------------
-- Table structure for research
-- ----------------------------
DROP TABLE IF EXISTS `research`;
CREATE TABLE `research`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '课题id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '课题类型',
  `student_id` int(20) NOT NULL COMMENT '学生id',
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生姓名',
  `teacher_id` int(20) NOT NULL COMMENT '导师id',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '导师姓名',
  `intro` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '课题简介',
  `background` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '研究背景',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '研究内容',
  `method` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '研究方法',
  `expect` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '预期结果',
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '总成绩',
  `group_id` int(20) NULL DEFAULT NULL COMMENT '答辩小组id',
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '答辩小组名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of research
-- ----------------------------
INSERT INTO `research` VALUES (2, '基于vue+node.js+mysql的移动端毕设记录及评分系统', '软件工程', 2, '张三', 5, '李老师', '测试测试', '测试测试', '研究内容', '研究方法', '预期结果啊', '91', 5, 'WEB开发组');
INSERT INTO `research` VALUES (3, '基于移动媒体的毕业设计答辩记录评分系统', '软件工程', 6, '王哈哈', 7, '黄老师', '一般来说，毕业设计的课题信息需要记录以下基本信息：\n\n课题名称：即毕业设计的题目。\n\n课题类型：比如软件工程、计算机科学等。\n\n指导教师：指导学生完成毕业设计的教师姓名。\n\n学生信息：包括学号、姓名等基本信息。\n\n课题简介：对毕业设计的概述和目标进行简要描述。', '一般来说，毕业设计的课题信息需要记录以下基本信息：\n\n课题名称：即毕业设计的题目。\n\n课题类型：比如软件工程、计算机科学等。\n\n指导教师：指导学生完成毕业设计的教师姓名。\n\n学生信息：包括学号、姓名等基本信息。\n\n课题简介：对毕业设计的概述和目标进行简要描述。', '该系统需要具备以下功能：\n学生信息登记功能：学生需要提供基本信息，如姓名、学号等。\n课题信息登记功能：学生需要提供毕业设计课题信息，如课题名称、指导教师等。\n答辩评分功能：教师需要登录系统后，可以查看学生提交的课题信息并对学生的答辩进行评分。评分细则可以根据答辩要求而定，建', '一般来说，毕业设计的课题信息需要记录以下基本信息：\n\n课题名称：即毕业设计的题目。\n\n课题类型：比如软件工程、计算机科学等。\n\n指导教师：指导学生完成毕业设计的教师姓名。\n\n学生信息：包括学号、姓名等基本信息。\n\n课题简介：对毕业设计的概述和目标进行简要描述。\n\n研究背景：阐述研', '一般来说，毕业设计的课题信息需要记录以下基本信息：\n\n课题名称：即毕业设计的题目。\n\n课题类型：比如软件工程、计算机科学等。\n\n指导教师：指导学生完成毕业设计的教师姓名。\n\n学生信息：包括学号、姓名等基本信息。\n\n课题简介：对毕业设计的概述和目标进行简要描述。\n\n研究背景：阐述研', NULL, 7, '移动终端开发组');
INSERT INTO `research` VALUES (4, '测试课题测试课题', '软件工程', 32, '刘建化', 29, '金老师', '测试简介测试简介测试简介', '测试', '测试', '测试', '测试', '89', 5, 'WEB开发组');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(12) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学号/工号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `type` int(1) NOT NULL COMMENT '身份  1学生 2老师',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `unit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位',
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专业',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (0, 'admin', '$2a$10$4cUhkRSoHUYMhTJP8pqxP.tP7EduCMT4x7XO/j3VKaaBNPeeaI0F2', '管理员', 3, NULL, '江汉大学', '无');
INSERT INTO `user` VALUES (1, '1000000', '$2a$10$Nu7vLqoTcE0kQnFdVSQAUOTAQ9OluVWG3EIqrv2ienpsYl/fsxUEK', '李白', 1, '12345678911', '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (2, '1000001', '$2a$10$RS9geHZNwYfbmZBe00./D.TsTAcc7FqcofY.BroinwoLNmZylVoKW', '张三', 1, '18379552034', '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (5, '8000001', '$2a$10$av08kR749zqrwXQqXjU7EurQBSfq3kWJPYyO3Pdtp6yXMeuLj0Pxe', '李老师', 2, '17386084884', '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (7, '8000003', '$2a$10$9XjoODMjQvwDoyYTylzly.7qi.UL6k9YgvL/bx2H/t83L9a.EpjNu', '黄老师', 2, NULL, NULL, NULL);
INSERT INTO `user` VALUES (10, '1000003', '$2a$10$kU9iqPS9mEZI35qe87gndeujYOKFOLDQcd9yNJKw/UkrU8nPSt.iS', '黄小华', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (11, '1000004', '$2a$10$Re6czZmR8E1XFvvjEPjsNu/Po8llFztSRPugbPOIVTQYx43Nf7W9i', '张慧琳', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (12, '1000005', '$2a$10$WHiokeRQkDh9ClEPN1ADSOjOFgk5z5pymmsYVclhVf67WJ0W.KXQm', '王蕾', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (13, '1000006', '$2a$10$1NI3XnXQCWmF/Dmdc5feZOYHX64Dp2gaAdxlJ/9tPsAmbu0qulfXK', '刘海燕', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (14, '1000007', '$2a$10$c3wrXQa5KwWDjY00k9GpIefh2xFbVsomYDAoltgiUI6DwXZHP/53i', '陈志宏', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (15, '1000008', '$2a$10$Hmux3BS4GufYYzSpb/bs4.iPKwFp1EbxsSv/LA.fw5Vd7AnJnO5F2', '余雨欣', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (16, '1000009', '$2a$10$jSURjQbvgy/tWjG4QnaR8u5mChI.JvBuaV.7UK5u0GWANzulROhiy', '沈飞鸿', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (17, '1000010', '$2a$10$GJkqNYTGAnT5grdWQM7AGu6b/rvDYHOhdIse3JkH8BFTwcmFUPfEu', '马利娜', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (18, '1000011', '$2a$10$kYkrVdr57g7f63hvl75pbON7.97CVnF9fncXOjKUQgSJuK8oRWPp6', '孙晓敏', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (19, '1000012', '$2a$10$lyO.9oBUuY/WlQuCtfWH6e18WxOz0pbvMg/Tg592MYdE9SZFS.ZjO', '唐建华', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (20, '1000013', '$2a$10$epby2bbCspFhnbF6Gv5hQ.dgjjmYtiyMR9P.Suknm0ZGWjEJSsHti', '林欣怡', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (21, '1000014', '$2a$10$zL8UxrIYCxTS/Bz8t3C4xuLwftOKW1Hi5EWEscv56maH2xz/uZxx6', '柯乐乐', 1, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (25, '8000004', '$2a$10$TBmw2GQsgi1uuVv3KsoL/uLOGnMnZd0GT7FMHFkRe4wVzSgXKZgJq', '马老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (26, '8000005', '$2a$10$7KRK5dWFGV1et1UPq8OBYuyDUQKjlY6R/xbyzdDjYDew/qeDPNo1y', '景老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (27, '8000006', '$2a$10$SKftmcGAxSCauWcWmkwxzep9UFdRZyELomkgWqlU7Gt/JQ/mX1CSq', '方老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (28, '8000007', '$2a$10$ef2mQzVO4.hdh0gQHWsIyuoO5BnNds/zIAtqSB6hVNRunNoxVA2f.', '刘老师', 2, '17356084884', '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (29, '8000008', '$2a$10$.3OIRkc5hIqjMM26lY.n1eGkNdd2NzBecL5je3Uob3OdorK4y/tJW', '金老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (30, '8000008', '$2a$10$LqqsIqhDrKlNiBm7js9pAe2fyuiSOXPMyMNO5wT0Kqpzy.XfzYYa.', '孙老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (31, '8000009', '$2a$10$lVDyIdyKjdtnsTzXwf7p7uysF4iNa40SJSTIgzgsv1Z47xabeKcOi', '杜老师', 2, NULL, '江汉大学', '数字媒体技术');
INSERT INTO `user` VALUES (32, '1000015', '$2a$10$eZAYtxbinWWPWRGTCdWpk.yV5xxe8RDHxrY4OX7MS/5jsGJXN6f7y', '刘建化', 1, '10000000000', '江汉大学', '数字媒体技术');

SET FOREIGN_KEY_CHECKS = 1;
