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
class LocalStorageUtil {
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static get(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }
}
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
// 게시물 추가 모달 & 버튼
const addPostModal = getElement(".add-post-modal");
const addPostModalFile = getElement(".add-post-modal-file");
const addPostModalContent = getElement(".add-post-modal-content");
const addPostModalImage = getElement(".add-post-modal-image");
const addPostModalTextarea = getElement(".add-post-modal-textarea");
const addPostModalButton = getElement("#add-post");
const addPostModalShareButton = getElement("#add-post-share");
// 게시물 요소
const postsGallary = getElement(".posts-gallary");
// 모달 닫기 버튼
const closeButton = getElement(".modal-close-button");
window.onload = () => {
    profileUI();
    defaultEvent();
    postUI();
};
function getElement(id) {
    const elementQuerySelector = document.querySelector(id);
    if (!elementQuerySelector) {
        throw new Error(`Element with id ${id} not found`);
    }
    return elementQuerySelector;
}
function getElementAll(id) {
    const elementQuerySelectorAll = document.querySelectorAll(id);
    if (!elementQuerySelectorAll) {
        throw new Error(`Element with id ${id} not found`);
    }
    return Array.from(elementQuerySelectorAll);
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
    if (addPostModalButton) {
        addPostModalButton.addEventListener("click", () => {
            addPostModal.showModal();
        });
    }
    if (addPostModalFile) {
        addPostModalFile.addEventListener("change", (e) => {
            updatePostImage(e);
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
    if (addPostModal) {
        addPostModal.addEventListener("click", (e) => {
            dialogOut(e);
        });
    }
}
function profileUI() {
    const profileData = LocalStorageUtil.get("profile");
    const profile = profileData ? profileData : defaultProfile;
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
    const profileData = LocalStorageUtil.get("profile");
    const _a = profileData
        ? profileData
        : defaultProfile, { id, img, name, description, website } = _a, rest = __rest(_a, ["id", "img", "name", "description", "website"]);
    const newProfile = Object.assign({ id: profileEditId.value, img: profileEditImage.getAttribute("src") || defaultProfile.img, name: profileEditName.value, description: profileEditDescription.value, website: profileEditWebsite.value }, rest);
    LocalStorageUtil.set("profile", newProfile);
    profileUI();
}
function updateProfile(newProfile) {
    LocalStorageUtil.set("profile", newProfile);
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
function selectPost() {
    const allPostModal = getElementAll("dialog.post-modal");
    if (allPostModal.length === 0) {
        return;
    }
    // NodeList를 배열로 변환
    const postModals = Array.from(allPostModal);
    const openPostModal = postModals.find(({ open }) => open);
    if (openPostModal) {
        const parent = openPostModal.parentNode;
        return parent.id;
    }
}
function postUI() {
    const openPostId = selectPost();
    const postData = LocalStorageUtil.get("posts");
    const posts = postData ? postData : [];
    // 게시물이 없을 때
    if (!posts.length && postsGallary) {
        postsGallary.classList.add("posts-gallary-empty");
        postsGallary.innerHTML = `<div class="posts-gallary-item-no-posts">
                                <div class="posts-gallary-item-no-posts-image">
                                  <img src="./assets/camera_icon.svg" alt="Camera_icon" />
                                </div>
                                <h3>게시물 없음</h3>
                              </div>`;
    }
    // 게시물이 있을 때
    postsGallary.classList.remove("posts-gallary-empty");
    const postsGallaryItem = posts.reduce((pre, cur) => {
        return (pre +
            `<div class="post" id="post-${cur.id}">
        <div class="post-likes-comments">
          <div class="post-likes-comments-icon">
            <img src="./assets/heart_icon.svg" alt="heart_icon" />
            <span>${cur.likes}</span>
          </div>
          <div class="post-likes-comments-icon">
            <img src="./assets/comment_icon.svg" alt="comment_icon" />
            <span>${cur.comments}</span>
          </div>
        </div>
        <img src="${cur.image}" alt="post-${cur.id}" />
        <dialog class="post-modal modal post-modal-view">
          <form method="dialog">
            <img class="post-image" src="${cur.image}" alt="post-${cur.id}" />
            <article class="post-modal-article">${cur.text}</article>
            <div class="post-likes-comments-update">
              <textarea class="post-text-update" placeholder="수정할 내용을 입력하세요.">${cur.text}</textarea>
              <div class="post-likes-comments-update-buttons">
                <button class="post-update-button">수정</button>
                <button class="post-cancel-button">취소</button>
              </div>
            </div>

            <div class="post-option-buttons">
              <button class="post-edit-button post-option-button">
                <img src="./assets/edit_icon.svg" alt="Edit_icon" />
              </button>
              <button class="post-delete-button post-option-button">
                <img src="./assets/delete_icon.svg" alt="Delete_icon" />
              </button>
            </div>

            <button class="modal-close-button">
              <img src="./assets/close_icon.svg" alt="Close_icon" />
            </button>
          </form>
        </dialog>
      </div>`);
    }, "");
    postsGallary.innerHTML = postsGallaryItem;
    posts.forEach(({ id, text }) => {
        var _a, _b, _c, _d, _e;
        const post = getElement(`#post-${id}`);
        if (!post) {
            return;
        }
        const postModal = post.querySelector(".post-modal");
        if (!postModal) {
            return;
        }
        if (postModal.id === `post-modal-${id}`) {
            postModal.showModal();
        }
        post.addEventListener("click", (e) => {
            if (e.target) {
                e.stopPropagation();
            }
            if (!postModal.open) {
                postModal.showModal();
            }
        });
        (_a = postModal
            .querySelector(".modal-close-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            postModalView(postModal, text);
        });
        (_b = post
            .querySelector(".post-delete-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            if (confirm("정말 삭제하시겠습니까?")) {
                deletePost(id);
            }
        });
        (_c = post
            .querySelector(".post-edit-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
            if (e.target) {
                e.stopPropagation();
            }
            postModalUpdate(postModal);
        });
        (_d = post
            .querySelector(".post-update-button")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => {
            if (e.target) {
                e.stopPropagation();
            }
            const postTextUpdate = postModal.querySelector(".post-text-update");
            if (postTextUpdate) {
                updatePost(id, postTextUpdate.value);
            }
        });
        (_e = post
            .querySelector(".post-cancel-button")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (e) => {
            if (e.target) {
                e.stopPropagation();
            }
            postModalView(postModal, text);
        });
    });
}
function postModalView(postModal, originText) {
    if (!postModal) {
        return;
    }
    postModal.classList.add("post-modal-view");
    postModal.classList.remove("post-modal-update");
    const postTextUpdate = postModal.querySelector(".post-text-update");
    if (postTextUpdate) {
        postTextUpdate.value = originText;
    }
}
function postModalUpdate(postModal) {
    if (!postModal) {
        return;
    }
    postModal.classList.add("post-modal-update");
    postModal.classList.remove("post-modal-view");
}
function createPost(image, text) {
    const postData = localStorage.getItem("posts");
    const posts = (typeof postData === "string" && JSON.parse(postData)) || [];
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        image,
        text,
        likes: 0,
        comments: 0,
    };
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    postUI();
}
function deletePost(id) {
    const postData = LocalStorageUtil.get("posts");
    const posts = postData ? postData : [];
    if (!posts.length) {
        return;
    }
    LocalStorageUtil.set("posts", posts.filter(({ id: PostId }) => PostId !== id));
    postUI();
}
function updatePost(id, text) {
    const postData = LocalStorageUtil.get("posts");
    const posts = postData ? postData : [];
    if (!posts.length) {
        return;
    }
    LocalStorageUtil.set("posts", posts.map((_a) => {
        var { id: PostId, text: PostText } = _a, rest = __rest(_a, ["id", "text"]);
        if (PostId === id) {
            return Object.assign({ id: PostId, text: PostText === text ? PostText : text }, rest);
        }
        return Object.assign({ id: PostId, text: PostText }, rest);
    }));
    postUI();
}
function addPostModalView() {
    addPostModal.classList.add("add-post-modal-view");
    addPostModal.classList.remove("add-post-modal-update");
}
function addPostModalUpdate() {
    addPostModal.classList.add("add-post-modal-update");
    addPostModal.classList.remove("add-post-modal-view");
}
function updatePostImage(e) {
    var _a;
    if (e.target) {
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const imageData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                addPostModalUpdate();
                addPostModalShareButton.addEventListener("click", () => {
                    createPost(imageData, addPostModalContent.value);
                    addPostModalTextarea.value = "";
                    addPostModalView();
                }, { once: true });
                if (imageData) {
                    addPostModalImage.setAttribute("src", imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    }
}
function dialogOut(e) {
    if (e.target === profileEditModal) {
        profileEditModal.close();
    }
}
