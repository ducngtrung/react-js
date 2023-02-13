package com.example.userbackend.service;

import com.example.userbackend.exception.BadRequestException;
import com.example.userbackend.exception.NotFoundException;
import com.example.userbackend.model.User;
import com.example.userbackend.model.dto.UserDto;
import com.example.userbackend.model.mapper.UserMapper;
import com.example.userbackend.model.request.CreateUserRequest;
import com.example.userbackend.model.request.UpdateAvatarRequest;
import com.example.userbackend.model.request.UpdatePasswordRequest;
import com.example.userbackend.model.request.UpdateUserRequest;
import com.example.userbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    // Autowired bằng constructor
    private final UserRepository userRepository;
    private final FileService fileService;
    private final MailService mailService;

    // Lấy danh sách user ở dạng DTO
    public List<UserDto> getUsers() {
        return userRepository.findAllUserDto();
    }

    // Tìm kiếm user theo tên
    public List<UserDto> searchUser(String name) {
        return userRepository.findUserDtoByNameContainingIgnoreCase(name);
    }

    // Lấy thông tin của user theo id
    public UserDto getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });

        return UserMapper.toUserDto(user);
    }

    // Xóa user
    public void deleteUser(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        userRepository.deleteById(user.getId());
    }

    // Tạo user mới
    public UserDto createUser(CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email " + request.getEmail() + " already exists");
        }

        Random rd = new Random();
        User user = new User();
        user.setId(rd.nextInt(100));
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setPassword(request.getPassword());
        userRepository.save(user);

        return UserMapper.toUserDto(user);
    }

    // Cập nhật thông tin của user
    public UserDto updateUser(int id, UpdateUserRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        userRepository.save(user);

        return UserMapper.toUserDto(user);
    }

    // Cập nhật password mới
    public void updatePassword(int id, UpdatePasswordRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });

        // Kiểm tra oldPassword có đúng không
        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new BadRequestException("Old password is incorrect!");
        }

        // Kiểm tra oldPassword có = newPassword không
        if (request.getNewPassword().equals(request.getOldPassword())) {
            throw new BadRequestException("Old password and new password cannot be the same!");
        }

        // Cập nhật newPassword cho user tương ứng
        user.setPassword(request.getNewPassword());
        userRepository.save(user);
    }

    // Quên mật khẩu
    public String forgotPassword(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });

        // Random chuỗi password mới cho user (100 -> 999)
        Random rd = new Random();
        String newPassword = String.valueOf(rd.nextInt(900) + 100);

        // Cập nhật password mới cho user
        user.setPassword(newPassword);
        userRepository.save(user);

        // Gửi email chứa mật khẩu mới
        mailService.sendMail(user.getEmail(), "Quên mật khẩu?", "Mật khẩu mới: " + newPassword);

        // Trả về thông tin password mới
        return newPassword;
    }

    // Upload ảnh, upload xong thì trả về đường dẫn api để xem ảnh
    public String uploadFile(int id, MultipartFile file) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        return fileService.uploadFile(id, file);
    }

    // Xem ảnh
    public byte[] readFile(int id, String fileId) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        return fileService.readFile(id, fileId);
    }

    // Lấy danh sách ảnh của một user
    public List<String> getFiles(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        return fileService.getFiles(id);
    }

    // Xóa ảnh
    public void deleteFile(int id, String fileId) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        fileService.deleteFile(id, fileId);
    }

    // Thay đổi ảnh avatar của user
    public void updateAvatar(int id, UpdateAvatarRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found user with id = " + id);
        });
        user.setAvatar(request.getAvatar());
        userRepository.save(user);
    }
}