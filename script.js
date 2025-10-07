// 商品数据
const products = [
  {
    name: "羽毛球拍",
    price: "RM150",
    imgUrl: "https://images.pexels.com/photos/19090/pexels-photo.jpg"
  },
  {
    name: "羽毛球鞋",
    price: "RM200",
    imgUrl: "https://images.pexels.com/photos/136579/pexels-photo-136579.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "羽毛球",
    price: "RM60",
    imgUrl: "https://images.unsplash.com/photo-1610884738235-f8306f06d0f9?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "运动服",
    price: "RM80",
    imgUrl: "https://images.unsplash.com/photo-1600180758895-db04138ef—" // 你要换成合法链接
  },
  {
    name: "护腕",
    price: "RM30",
    imgUrl: "https://images.unsplash.com/photo-1576809933402-7eda4db6cf87?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "运动包",
    price: "RM120",
    imgUrl: "https://images.unsplash.com/photo-1600180758880-e0517a2d937a?auto=format&fit=crop&w=400&q=80"
  },
  // …更多产品
  { name: "手胶", price: "RM15", img: "images/grip.jpg" },
  { name: "袜子", price: "RM25", img: "images/socks.jpg" },
  { name: "防滑垫", price: "RM40", img: "images/mat.jpg" },
  { name: "运动毛巾", price: "RM35", img: "images/towel.jpg" }
];

const productContainer = document.getElementById("productContainer");
const loadingIndicator = document.getElementById("loading");

let currentIndex = 0;
const itemsPerPage = 4;
let loading = false;

// 淡入动画观察器
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// 渲染函数
function loadMore() {
  if (loading) return;
  loading = true;
  loadingIndicator.style.display = "block";

  setTimeout(() => {
    const nextItems = products.slice(currentIndex, currentIndex + itemsPerPage);
    nextItems.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <button>加入购物车</button>
      `;
      productContainer.appendChild(card);
      observer.observe(card); // 开始监听淡入动画
    });

    currentIndex += itemsPerPage;
    loading = false;
    loadingIndicator.style.display = "none";

    if (currentIndex >= products.length) {
      window.removeEventListener("scroll", handleScroll);
      loadingIndicator.textContent = "已加载全部商品";
      loadingIndicator.style.display = "block";
    }
  }, 800);
}

// 滚动加载监听
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMore();
  }
}

// 初始化
window.addEventListener("scroll", handleScroll);
loadMore();
