// 프로필 인터페이스
interface Profile {
  id: string;
  img: string;
  name: string;
  description: string;
  website: string;
  posts: number;
  followers: number;
  following: number;
}

// 게시물 인터페이스
interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  comments: number;
}

class LocalStorageUtil {
  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value) as T;
  }
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
};

// 프로필 요소
const profileImage = getElement<HTMLImageElement>("#profile-image");
const profileId = getElement<HTMLElement>("#profile-id");
const profileName = getElement<HTMLElement>("#profile-content-name");
const profileDescription = getElement<HTMLElement>(
  "#profile-content-description"
);
const profileWebsite = getElement<HTMLElement>("#profile-content-website-link");
const profilePosts = getElement<HTMLElement>("#profile-posts");
const profileFollowers = getElement<HTMLElement>("#profile-followers");
const profileFollowing = getElement<HTMLElement>("#profile-follows");

// 프로필 수정 요소
const profileEditImage = getElement<HTMLImageElement>("#profile-edit-image");
const profileEditUploadImage = getElement<HTMLImageElement>(
  "#profile-edit-upload-image"
);
const profileEditId = getElement<HTMLInputElement>("#profile-edit-id");
const profileEditName = getElement<HTMLInputElement>("#profile-edit-name");
const profileEditDescription = getElement<HTMLInputElement>(
  "#profile-edit-description"
);
const profileEditWebsite = getElement<HTMLInputElement>(
  "#profile-edit-website"
);

// 프로필 수정 모달 & 버튼
const profileEditButton = getElement<HTMLButtonElement>("#profile-edit");
const profileEditModal = getElement<HTMLDialogElement>(".profile-edit-modal");
const profileEditSaveButton =
  getElement<HTMLButtonElement>("#profile-edit-save");

// 게시물 추가 모달 & 버튼
const addPostModal = getElement<HTMLDialogElement>(".add-post-modal");
const addPostModalFile = getElement<HTMLInputElement>(".add-post-modal-file");
const addPostModalContent = getElement<HTMLTextAreaElement>(
  ".add-post-modal-content"
);
const addPostModalImage = getElement<HTMLImageElement>(".add-post-modal-image");
const addPostModalTextarea = getElement<HTMLTextAreaElement>(
  ".add-post-modal-textarea"
);
const addPostModalButton = getElement<HTMLButtonElement>("#add-post");
const addPostModalShareButton =
  getElement<HTMLButtonElement>("#add-post-share");

// 게시물 요소
const postsGallary = getElement<HTMLDivElement>(".posts-gallary");

// 모달 닫기 버튼
const closeButton = getElement<HTMLButtonElement>(".modal-close-button");

window.onload = () => {
  profileUI();
  defaultEvent();
  postUI();
};

function getElement<T extends HTMLElement>(id: string): T {
  const elementQuerySelector = document.querySelector(id);
  if (!elementQuerySelector) {
    throw new Error(`Element with id ${id} not found`);
  }
  return elementQuerySelector as T;
}

function getElementAll<T extends HTMLElement>(id: string): T[] {
  const elementQuerySelectorAll = document.querySelectorAll(id);
  if (!elementQuerySelectorAll) {
    throw new Error(`Element with id ${id} not found`);
  }
  return Array.from(elementQuerySelectorAll) as T[];
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
  const profileData = LocalStorageUtil.get<Profile>("profile");
  const profile: Profile = profileData ? profileData : defaultProfile;

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
  const profileData = LocalStorageUtil.get<Profile>("profile");
  const { id, img, name, description, website, ...rest } = profileData
    ? profileData
    : defaultProfile;

  const newProfile: Profile = {
    id: profileEditId.value,
    img: profileEditImage.getAttribute("src") || defaultProfile.img,
    name: profileEditName.value,
    description: profileEditDescription.value,
    website: profileEditWebsite.value,
    ...rest,
  };

  LocalStorageUtil.set("profile", newProfile);
  profileUI();
}

function updateProfile(newProfile: Profile) {
  LocalStorageUtil.set("profile", newProfile);
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
      };
      reader.readAsDataURL(file);
    }
  }
};

function selectPost() {
  const allPostModal = getElementAll<HTMLDialogElement>("dialog.post-modal");

  if (allPostModal.length === 0) {
    return;
  }

  // NodeList를 배열로 변환
  const postModals = Array.from(allPostModal);
  const openPostModal = postModals.find(({ open }) => open);

  if (openPostModal) {
    const parent = openPostModal.parentNode as Element;
    return parent.id;
  }
}

function postUI() {
  const openPostId = selectPost();

  const postData = LocalStorageUtil.get<Post[]>("posts");
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
  const postsGallaryItem = posts.reduce((pre: string, cur: Post) => {
    return (
      pre +
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
      </div>`
    );
  }, "");

  postsGallary.innerHTML = postsGallaryItem;

  posts.forEach(({ id, text }) => {
    const post = getElement<HTMLDivElement>(`#post-${id}`);

    if (!post) {
      return;
    }

    const postModal = post.querySelector<HTMLDialogElement>(".post-modal");

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

    postModal
      .querySelector<HTMLButtonElement>(".modal-close-button")
      ?.addEventListener("click", () => {
        postModalView(postModal, text);
      });

    post
      .querySelector<HTMLButtonElement>(".post-delete-button")
      ?.addEventListener("click", () => {
        if (confirm("정말 삭제하시겠습니까?")) {
          deletePost(id);
        }
      });

    post
      .querySelector<HTMLButtonElement>(".post-edit-button")
      ?.addEventListener("click", (e) => {
        if (e.target) {
          e.stopPropagation();
        }
        postModalUpdate(postModal);
      });

    post
      .querySelector<HTMLButtonElement>(".post-update-button")
      ?.addEventListener("click", (e) => {
        if (e.target) {
          e.stopPropagation();
        }
        const postTextUpdate = postModal.querySelector<HTMLTextAreaElement>(
          ".post-text-update"
        );
        if (postTextUpdate) {
          updatePost(id, postTextUpdate.value);
        }
      });

    post
      .querySelector<HTMLButtonElement>(".post-cancel-button")
      ?.addEventListener("click", (e) => {
        if (e.target) {
          e.stopPropagation();
        }
        postModalView(postModal, text);
      });
  });
}

function postModalView(postModal: HTMLDialogElement, originText: string) {
  if (!postModal) {
    return;
  }

  postModal.classList.add("post-modal-view");
  postModal.classList.remove("post-modal-update");
  const postTextUpdate =
    postModal.querySelector<HTMLTextAreaElement>(".post-text-update");
  if (postTextUpdate) {
    postTextUpdate.value = originText;
  }
}

function postModalUpdate(postModal: HTMLDialogElement) {
  if (!postModal) {
    return;
  }

  postModal.classList.add("post-modal-update");
  postModal.classList.remove("post-modal-view");
}

function createPost(image: string, text: string) {
  const postData = localStorage.getItem("posts");
  const posts = (typeof postData === "string" && JSON.parse(postData)) || [];

  const newPost: Post = {
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

function deletePost(id: number) {
  const postData = LocalStorageUtil.get<Post[]>("posts");
  const posts = postData ? postData : [];

  if (!posts.length) {
    return;
  }

  LocalStorageUtil.set(
    "posts",
    posts.filter(({ id: PostId }) => PostId !== id)
  );
  postUI();
}

function updatePost(id: number, text: string) {
  const postData = LocalStorageUtil.get<Post[]>("posts");
  const posts = postData ? postData : [];

  if (!posts.length) {
    return;
  }

  LocalStorageUtil.set(
    "posts",
    posts.map(({ id: PostId, text: PostText, ...rest }) => {
      if (PostId === id) {
        return {
          id: PostId,
          text: PostText === text ? PostText : text,
          ...rest,
        };
      }
      return {
        id: PostId,
        text: PostText,
        ...rest,
      };
    })
  );
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

function updatePostImage(e: Event) {
  if (e.target) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        addPostModalUpdate();
        addPostModalShareButton.addEventListener("click", () => {
          createPost(imageData as string, addPostModalContent.value);
          addPostModalTextarea.value = "";
          addPostModalView();
        }, {once: true});
        if (imageData) {
          addPostModalImage.setAttribute("src", imageData as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }
}

function dialogOut(e: Event) {
  if (e.target === profileEditModal) {
    profileEditModal.close();
  }
}
