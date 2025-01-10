// 프로필 인터페이스
interface Profile {
  id: string,
  img: string,
  name: string,
  description: string,
  website: string,
  posts: number,
  followers: number,
  following: number,
}

// 기본 프로필
const defaultProfile: Profile = {
  id: "ysyoon",
  img: "./assets/default_profile.svg",
  name: "Yoon Yong Seol",
  description: "Hello, I'm Yoon Yong Seol. I'm a software engineer.",
  website: "https://www.naver.com",
  posts: 100,
  followers: 100,
  following: 100,
} 

// 프로필 요소
const profileImage = getElement<HTMLImageElement>("#profile-image");
const profileId = getElement<HTMLElement>("#profile-id");
const profileName = getElement<HTMLElement>("#profile-content-name");
const profileDescription = getElement<HTMLElement>("#profile-content-description");
const profileWebsite = getElement<HTMLElement>("#profile-content-website-link");
const profilePosts = getElement<HTMLElement>("#profile-posts");
const profileFollowers = getElement<HTMLElement>("#profile-followers");
const profileFollowing = getElement<HTMLElement>("#profile-follows");

// 프로필 수정 요소
const profileEditImage = getElement<HTMLImageElement>("#profile-edit-image");
const profileEditUploadImage = getElement<HTMLImageElement>("#profile-edit-upload-image");
const profileEditId = getElement<HTMLInputElement>("#profile-edit-id");
const profileEditName = getElement<HTMLInputElement>("#profile-edit-name");
const profileEditDescription = getElement<HTMLInputElement>("#profile-edit-description");
const profileEditWebsite = getElement<HTMLInputElement>("#profile-edit-website");

// 프로필 수정 모달 & 버튼
const profileEditButton = getElement<HTMLButtonElement>("#profile-edit");
const profileEditModal = getElement<HTMLDialogElement>(".profile-edit-modal");
const profileEditSaveButton = getElement<HTMLButtonElement>("#profile-edit-save");

// 모달 닫기 버튼
const closeButton = getElement<HTMLButtonElement>(".modal-close-button");

window.onload = () => {
  profileUI()
  defaultEvent()
}

function getElement<T extends HTMLElement>(id: string): T {
  const elementQuerySelector = document.querySelector(id);
  if (!elementQuerySelector) {
    throw new Error(`Element with id ${id} not found`);
  }
  return elementQuerySelector as T;
}

function defaultEvent() {
  if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
      profileEditModal.showModal();
    })
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
  const profileData = localStorage.getItem("profile")
  const profile: Profile = profileData ? JSON.parse(profileData) : defaultProfile;

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
  const profileData = localStorage.getItem("profile")
  const { id, img, name, description, website, ...rest } = profileData ? JSON.parse(profileData) : defaultProfile;

  const newProfile: Profile = {
    id: profileEditId.value,
    img: profileEditImage.getAttribute("src"),
    name: profileEditName.value,
    description: profileEditDescription.value,
    website: profileEditWebsite.value,
    ...rest
  };

  localStorage.setItem("profile", JSON.stringify(newProfile));
  profileUI();
}

function updateProfile(newProfile: Profile) {
  localStorage.setItem("profile", JSON.stringify(newProfile));
  profileUI();
}

const updateProfileImage = (e: Event) => {
  if (e.target) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        if (imageData) {
          profileEditImage.setAttribute("src", imageData as string);
        }
      }
      reader.readAsDataURL(file);
    }
  }
}

function dialogOut(e: Event) {
  if (e.target === profileEditModal) {
    profileEditModal.close();
  }
}

