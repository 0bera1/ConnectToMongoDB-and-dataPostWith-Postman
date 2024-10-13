import User from "../models/user.model.js";

export const signup = async (req, res) => {
  // bu fonksiyon ile kullanıcı kaydı yapılacak
  try {
    const { fullName, userName, email, password, confirmPassword, gender } =
      req.body; // req.body den gelen verileri al

    if (password != confirmPassword) {
      // şifreler eşleşmiyorsa hata döndür
      return res.status(400).json({ error: "Password does not match." });
    }

    const user = await User.findOne({ userName }); // kullanıcı adı veritabanında var mı kontrol et

    if (user) {
      // kullanıcı adı varsa hata döndür
      return res.status(400).json({ error: "User already exists." });
      // res.status(400) => Bad Request
    }
    // kullanıcı adı yoksa yeni kullanıcı oluştur
    //  hash password here
    // https://avatar-placeholder.iran.liara.run/

    // boyProfilePic ve girlProfilePic değişkenlerine kullanıcı adına göre profil resmi oluşturuluyor
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      email,
      password,
      gender,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save(); // yeni kullanıcıyı kaydet

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    }); // başarılı mesaj döndür
    // res.status(201) => Created
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Server error occurred." });
  }
};

export const login = (req, res) => {
  // bu fonksiyon ile kullanıcı girişi yapılacak
  console.log("loginUser");
};

export const logout = (req, res) => {
  // bu fonksiyon ile kullanıcı çıkışı yapılacak
  console.log("logoutUser");
};
