const videoMap = {
    "Box Rotate": {
        src: "./static/videos/Rotate Box 10 speed up.mp4",
        description: "Rotate a box."
    },
    "Cup into Plate": {
        src: "./static/videos/Cup into Plate 10 speed up.mp4",
        description: "Place a cup into a plate."
    },
    "Cup Stacking": {
        src: "./static/videos/Cup Stacking 10 speed up.mp4",
        description: "Place two cups of the same size one on top of the other."
    },
    "Open Drawer and Pick Cup": {
        src: "./static/videos/Open Drawer and Pickup Cup 10 speed up.mp4",
        description: "Open a drawer and pick up a cup from inside."
    },
    "Open Drawer": {
        src: "./static/videos/Open Drawer 10 speed up.mp4",
        description: "Grasp the drawer handle and pull it open."
    },
    "Pick up Plushies Toy": {
        src: "./static/videos/Pick up Plushies toy 10 speed up.mp4",
        description: "Grasp a fabric toy placed on the table and pick up."
    },
    "Pickup Dice Toy": {
        src: "./static/videos/Pickup Dice Toy 10 speed up.mp4",
        description: "Grasp a dice toy placed on the table and pick up."
    },
    "Pouring Cubes onto Plate": {
        src: "./static/videos/Pouring Cubes onto Plate 10 speed up.mp4",
        description: "Pour small cubes from a cup onto a plate."
    },
    "Scissor Pickup": {
        src: "./static/videos/Scissor Pickup 10 speed up.mp4",
        description: "Grasp a pair of scissors placed on a box."
    },
    "Two Same-Sized Cup Stacking": {
        src: "./static/videos/Two Same-Sized Cup Stacking 10 speed up.mp4",
        description: "Place the red cup on top of the green cup, and then stack both on top of the blue cup."
    }
};

const tabs = document.querySelectorAll(".tabs a");
const videoElement = document.getElementById("selected-video");
const videoSource = document.getElementById("video-source");
const taskDescription = document.getElementById("task-description");

tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        const videoName = tab.getAttribute("data-video");
        const videoData = videoMap[videoName];
        if (videoData) {
            videoSource.src = videoData.src;
            videoElement.load();
            videoElement.play(); // 自动开始播放
            taskDescription.textContent = videoData.description;
        } else {
            console.error("Video data not found for:", videoName);
        }
    });
});

// Load the first video by default
const firstTab = tabs[0];
const firstVideoName = firstTab.getAttribute("data-video");
const firstVideoData = videoMap[firstVideoName];
if (firstVideoData) {
    videoSource.src = firstVideoData.src;
    videoElement.load();
    videoElement.play(); // 默认加载第一个视频时自动播放
    taskDescription.textContent = firstVideoData.description;
}
