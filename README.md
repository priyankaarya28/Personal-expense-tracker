# Personal Expense Tracker (HTML, CSS, JavaScript)

A simple, clean **Personal Expense Tracker** built using vanilla HTML, CSS, and JavaScript. It allows users to add, view, update, delete, and filter expenses — all saved locally using **localStorage** (no backend required).

---

## 🚀 Features

### ✅ Must-Have Features
- Add expense (amount, date, note)
- View all expenses
- Update and delete expense
- Save data persistently in browser (localStorage)
- Basic validation & error handling

### 🌟 Good-to-Have Features
- Categories (Food, Travel, Bills, Shopping, Other)
- Summary reports (Total spent, Monthly summary)
- Filters (by date and category)
- Responsive and modern UI design
- Sample data for quick demo

---

## 🧩 Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Storage:** Browser localStorage (JSON format)

---

## 🖥️ How to Run

1. Download the project or clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```

2. Open the folder and locate the `index.html` file.

3. Double-click `index.html` (or open with a browser like Chrome/Edge/Firefox).

That’s it! The tracker will run locally and save your data automatically.

---

## 📁 Project Structure
```
📦 expense-tracker
 ┣ 📜 index.html        # Main app file (HTML, CSS, JS combined)
 ┣ 📜 README.md          # Documentation file
 ┗ 📜 sample_data.json   # Example structure for localStorage data
```

---

## 📊 Data Format
Each expense item is stored as an object in localStorage under key `expenses_v1`:
```json
{
  "id": 1,
  "amount": 199.99,
  "date": "2025-10-04",
  "note": "Dinner with friends",
  "category": "food"
}
```

---

## 🧠 Design Decisions
- LocalStorage used for simplicity and offline access.
- Fully client-side app; no frameworks for maximum portability.
- Clean modular JS functions for readability.
- Responsive layout using CSS grid and flexbox.

---

## 🧪 Sample Input/Output
### Input Example
| Amount | Date | Note | Category |
|---------|------|------|-----------|
| 250.00  | 2025-10-01 | Grocery shopping | Food |
| 100.00  | 2025-10-02 | Auto fare | Travel |

### Output Summary
```
Total: ₹350.00
This Month: ₹350.00
Category Breakdown:
- Food: ₹250.00
- Travel: ₹100.00
```

---

## 📦 Future Enhancements
- CSV/PDF export
- Chart-based reports (bar/pie visualization)
- User authentication & cloud sync
- Dark/Light theme toggle

---

## 🧑‍💻 Author
**Priyanka Arya**  
Full Stack Developer | MERN Stack Enthusiast  
[GitHub](https://github.com/) • [LinkedIn](https://linkedin.com/)

---

### 💬 Feedback
If you have suggestions or feature ideas, feel free to open an issue or connect on LinkedIn!