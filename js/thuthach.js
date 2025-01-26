function startGame() {
  const playerInput = document.getElementById("playerListInput").value.trim();
  const minAmountInput = document
    .getElementById("minAmount")
    .value.trim()
    .replace(/,/g, "");
  const maxAmountInput = document
    .getElementById("maxAmount")
    .value.trim()
    .replace(/,/g, "");
  const resultElement = document.getElementById("result");

  // Tách danh sách người chơi và loại bỏ trùng lặp
  let playerList = playerInput
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  playerList = [...new Set(playerList)]; // Loại bỏ tên trùng lặp

  // Kiểm tra danh sách người chơi và số tiền có hợp lệ không
  if (playerList.length < 2 || minAmountInput === "" || maxAmountInput === "") {
    alert("Vui lòng nhập danh sách ít nhất 2 người chơi và số tiền hợp lệ!");
    return;
  }

  const minAmount = parseInt(minAmountInput);
  const maxAmount = parseInt(maxAmountInput);

  if (isNaN(minAmount) || isNaN(maxAmount)) {
    alert("Vui lòng nhập số tiền hợp lệ!");
    return;
  }

  if (minAmount >= maxAmount) {
    alert("Số tiền nhỏ nhất phải nhỏ hơn số tiền lớn nhất!");
    return;
  }

  // Chọn ngẫu nhiên người lì xì và người nhận, đảm bảo không trùng
  let giver, receiver;
  do {
    giver = playerList[Math.floor(Math.random() * playerList.length)];
    receiver = playerList[Math.floor(Math.random() * playerList.length)];
  } while (giver === receiver);

  // Random số tiền và làm tròn đến hàng nghìn
  const randomAmount =
    Math.floor((Math.random() * (maxAmount - minAmount + 1)) / 1000) * 1000 +
    minAmount;

  // Hiển thị kết quả
  resultElement.innerHTML = `${giver} lì xì cho ${receiver}: <strong>${randomAmount.toLocaleString()} VND</strong>`;

  // Thêm hiệu ứng hiển thị
  resultElement.style.transition = "all 1s ease-in-out";
  resultElement.style.opacity = 0;
  setTimeout(() => {
    resultElement.style.opacity = 1;
    resultElement.style.transform = "scale(1.2)";
  }, 100);
  setTimeout(() => {
    resultElement.style.transform = "scale(1)";
  }, 500);
}

// Tự động thêm dấu phẩy khi nhập số tiền
function formatCurrency(input) {
  input.value = input.value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
