var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// 기본 프로필
const defaultProfile = {
    id: "ysyoon",
    img: "./assets/default_profile.svg",
    name: "Yoon Yong Seol",
    description: "Hello, I'm Yoon Yong Seol. I'm a software engineer.",
    website: "https://www.naver.com",
    posts: 100,
    followers: 100,
    following: 100,
};
// 프로필 요소
const profileImage = getElement("#profile-image");
const profileId = getElement("#profile-id");
const profileName = getElement("#profile-content-name");
const profileDescription = getElement("#profile-content-description");
const profileWebsite = getElement("#profile-content-website-link");
const profilePosts = getElement("#profile-posts");
const profileFollowers = getElement("#profile-followers");
const profileFollowing = getElement("#profile-follows");
// 프로필 수정 요소
const profileEditImage = getElement("#profile-edit-image");
const profileEditUploadImage = getElement("#profile-edit-upload-image");
const profileEditId = getElement("#profile-edit-id");
const profileEditName = getElement("#profile-edit-name");
const profileEditDescription = getElement("#profile-edit-description");
const profileEditWebsite = getElement("#profile-edit-website");
// 프로필 수정 모달 & 버튼
const profileEditButton = getElement("#profile-edit");
const profileEditModal = getElement(".profile-edit-modal");
const profileEditSaveButton = getElement("#profile-edit-save");
// 모달 닫기 버튼
const closeButton = getElement(".modal-close-button");
window.onload = () => {
    profileUI();
    defaultEvent();
};
function getElement(id) {
    const elementQuerySelector = document.querySelector(id);
    if (!elementQuerySelector) {
        throw new Error(`Element with id ${id} not found`);
    }
    return elementQuerySelector;
}
function defaultEvent() {
    if (profileEditButton) {
        profileEditButton.addEventListener("click", () => {
            profileEditModal.showModal();
        });
    }
    if (profileEditSaveButton) {
        profileEditSaveButton.addEventListener("click", profileEditSave);
    }
    if (profileEditModal) {
        profileEditModal.addEventListener("change", (e) => {
            updateProfileImage(e);
        });
    }
    if (profileEditModal) {
        profileEditModal.addEventListener("click", (e) => {
            dialogOut(e);
        });
    }
    if (closeButton) {
        closeButton.addEventListener("click", (e) => {
            if (e.target === profileEditModal) {
                profileEditModal.close();
                profileUI();
            }
        });
    }
}
function profileUI() {
    const profileData = localStorage.getItem("profile");
    const profile = profileData ? JSON.parse(profileData) : defaultProfile;
    document.title = `${profile.name}(@${profile.id}) - instagram`;
    profileImage.setAttribute("src", profile.img);
    profileId.textContent = profile.id;
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.description;
    profileWebsite.textContent = profile.website;
    profileWebsite.setAttribute("href", profile.website);
    const postsStrong = profilePosts.querySelector("strong");
    if (postsStrong) {
        postsStrong.textContent = profile.posts.toString();
    }
    const followersStrong = profileFollowers.querySelector("strong");
    if (followersStrong) {
        followersStrong.textContent = profile.followers.toString();
    }
    const followingStrong = profileFollowing.querySelector("strong");
    if (followingStrong) {
        followingStrong.textContent = profile.following.toString();
    }
    profileEditImage.setAttribute("src", profile.img);
    profileEditId.value = profile.id;
    profileEditName.value = profile.name;
    profileEditDescription.value = profile.description;
    profileEditWebsite.value = profile.website;
}
function profileEditSave() {
    const profileData = localStorage.getItem("profile");
    const _a = profileData ? JSON.parse(profileData) : defaultProfile, { id, img, name, description, website } = _a, rest = __rest(_a, ["id", "img", "name", "description", "website"]);
    const newProfile = Object.assign({ id: profileEditId.value, img: profileEditImage.getAttribute("src"), name: profileEditName.value, description: profileEditDescription.value, website: profileEditWebsite.value }, rest);
    localStorage.setItem("profile", JSON.stringify(newProfile));
    profileUI();
}
function updateProfile(newProfile) {
    localStorage.setItem("profile", JSON.stringify(newProfile));
    profileUI();
}
const updateProfileImage = (e) => {
    var _a;
    if (e.target) {
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const imageData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                if (imageData) {
                    profileEditImage.setAttribute("src", imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    }
};
function dialogOut(e) {
    if (e.target === profileEditModal) {
        profileEditModal.close();
    }
}
