# 🚀 Quick Start Guide - RefundAI Platform (SaaS Edition)

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

---

## 1️⃣ Install Dependencies (1 min)

```bash
npm install
```

**Expected:** All dependencies installed successfully

---

## 2️⃣ Start Development Server (30 seconds)

```bash
npm run dev
```

**Output:**
```
▲ Next.js 16.2.9
- Local:        http://localhost:3000
```

**Keep this terminal open!**

---

## 3️⃣ Open in Browser

Visit: **http://localhost:3000**

---

## 📍 Routes & Features

### Public Routes
| Route | Purpose | Description |
|-------|---------|-------------|
| `/` | Landing Page | Hero section with AI branding |
| `/chat` | Chat Interface | 3-column modern chat layout |

### Admin Routes (Protected - Login Required)
| Route | Purpose | Credentials |
|-------|---------|-------------|
| `/admin/login` | Admin Login | (public) |
| `/admin` | Dashboard | admin / 1234 |
| `/admin/approve` | Approval Queue | admin / 1234 |

---

## 🔑 Admin Login

**Username:** `admin`
**PIN:** `1234`

**To Login:**
1. Go to http://localhost:3000/admin/login
2. Enter username: `admin`
3. Enter PIN: `1234`
4. Click "Login"
5. Redirected to dashboard

---

## 🌙 Dark Mode

Click the moon/sun icon in the navbar to toggle dark/light mode.

**Preference is saved** - will persist on page refresh!

---

## 🧪 Quick Test Flow

### Test 1: View Chat Interface (30 seconds)
```
1. Go to http://localhost:3000/chat
2. Type customer ID: 1
3. See APPROVED decision
4. View expandable reasoning logs
```

### Test 2: Admin Workflow (2 minutes)
```
1. Go to http://localhost:3000/admin/login
2. Login with: admin / 1234
3. View dashboard with stats
4. Check "Recent Decisions" table
5. Click "View Approvals"
6. See pending refund requests
7. Click "Approve" or "Reject"
```

### Test 3: Dark Mode (30 seconds)
```
1. Any page
2. Click theme toggle (top right)
3. See instant dark/light switch
4. Refresh page - preference persists
```

---

## 📊 Test Data

**Customer IDs:** 1-15 (all with different scenarios)

Examples:
- ID 1: ✅ APPROVED
- ID 7: ⏳ PENDING_MANAGER_APPROVAL (high value)
- ID 2: ❌ DENIED
- ID 3: ✅ APPROVED
- ID 4: ⏳ PENDING_MANAGER_APPROVAL
- ID 5: ❌ DENIED

---

## 🎨 Design Features

✅ Modern 3-column chat layout
✅ Professional admin dashboard
✅ Manager approval workflow
✅ Dark/light theme toggle
✅ Beautiful animations
✅ Responsive on all devices
✅ Clean, modern design

---

## 📁 Project Structure

```
project/
├── components/
│   ├── ui/              ← Design system
│   ├── Navbar.tsx
│   ├── RefundChatInterface.tsx
│   └── AdminGuard.tsx
├── context/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── app/
│   ├── page.tsx         (Landing)
│   ├── layout.tsx       (Root)
│   ├── chat/page.tsx    (Chat interface)
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── page.tsx     (Dashboard)
│   │   └── approve/page.tsx
│   └── api/refund/route.ts
├── lib/
│   ├── agent.ts         (Refund logic)
│   └── tools.ts         (Validation tools)
└── app/data/
    ├── customers.json
    └── refundPolicy.txt
```

---

## ✅ Verify Installation

After running `npm run dev`, check:

- [ ] http://localhost:3000 loads
- [ ] Navbar visible with theme toggle
- [ ] Chat page works (http://localhost:3000/chat)
- [ ] Admin login accessible (http://localhost:3000/admin/login)
- [ ] Can login with admin/1234
- [ ] Dashboard shows stats
- [ ] Dark mode toggle works
- [ ] Responsive on mobile (F12 in browser)

---

## 🔧 Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check for errors
```

---

## 🎓 What to Explore

1. **Design System** - `components/ui/index.tsx`
   - Button, Card, Badge, Input, Avatar, Modal, etc.

2. **Theme System** - `context/ThemeContext.tsx`
   - Dark/light mode with localStorage

3. **Auth System** - `context/AuthContext.tsx`
   - Admin login with demo credentials

4. **Modern Components** - `components/RefundChatInterface.tsx`
   - Professional 3-column chat layout

5. **Backend Logic** - `lib/agent.ts` and `lib/tools.ts`
   - Refund decision logic (unchanged from Phase 1)

---

## 📚 Full Documentation

For comprehensive details, see:
- **SAAS_REDESIGN_COMPLETE.md** - Complete redesign overview
- **DESIGN_ARCHITECTURE.md** - Architecture & design decisions
- **README.md** - Original project documentation

---

## ✨ Key Improvements

| Feature | Before | After |
|---------|--------|-------|
| Design | Basic | Professional SaaS |
| Dark Mode | ❌ | ✅ Dark/Light |
| Admin UI | Simple | Enterprise-grade |
| Chat Interface | Minimal | 3-column modern |
| Dashboard | None | Full stats + tables |
| Approval Workflow | None | Complete workflow |
| Animations | None | Smooth transitions |
| Overall Feel | Functional | Startup-funded |

---

## 🚀 Next Steps

1. Explore the chat interface at `/chat`
2. Try admin login (admin/1234)
3. Review the dashboard
4. Check the approval workflow
5. Toggle dark mode
6. Test on mobile view

---

**Status:** ✅ Production Ready - Fully Functional SaaS Platform
**Last Updated:** 2025
**Framework:** Next.js 16 + React 19 + Tailwind CSS

## 📋 Test These Scenarios

| ID | Customer | Decision | Why |
|----|----------|----------|-----|
| 1 | Rajesh Kumar | ✅ Pending Approval | High value (24,999) |
| 2 | Priya Singh | ❌ Denied | Digital product |
| 3 | Amit Patel | ❌ Denied | Too old (6+ months) |
| 4 | Neha Gupta | ❌ Denied | Damaged product |
| 5 | Vikram Reddy | ✅ Approved | Recent, physical, small |
| 6 | Anjali Verma | ✅ Approved | Recent, physical, small |
| 7 | Rohit Sharma | ⚠️ Pending | Very high value (185,000) |
| 8 | Divya Mishra | ❌ Denied | Digital product |
| 9 | Arjun Nair | ⚠️ Pending | High value (99,999) |
| 10 | Sneha Desai | ❌ Denied | Digital product |
| 11 | Karthik Raman | ❌ Denied | Damaged + high value |
| 12 | Meera Rao | ❌ Denied | Too old |
| 13 | Suresh Kumar | ⚠️ Pending | High value (125,000) |
| 14 | Pooja Singh | ❌ Denied | Digital product |
| 15 | Ishaan Malhotra | ✅ Pending | High value (29,999) |

---

## 🔍 Understanding the Response

Every refund decision includes:

```json
{
  "decision": "One of: APPROVED, DENIED, PENDING_MANAGER_APPROVAL",
  "reason": "Human-readable explanation",
  "logs": [
    {
      "tool": "Tool name (e.g., checkRefundWindow)",
      "timestamp": "ISO timestamp",
      "result": "true/false or status",
      "details": "What the tool found"
    }
    // ... up to 6 tools
  ],
  "customerDetails": { ... },
  "refundAmount": 12345,
  "requiresManagerApproval": true/false
}
```

---

## 📁 Key Files

```
app/page.tsx              ← Chat interface (what users see)
app/admin/page.tsx        ← Admin dashboard
app/api/refund/route.ts   ← The API endpoint
lib/agent.ts              ← Decision logic
lib/tools.ts              ← Validation functions
types/index.ts            ← TypeScript types
README.md                 ← Full documentation
```

---

## 🧪 One-Minute Test

1. Open http://localhost:3000
2. Enter: `1`
3. Click: "Request Refund"
4. See: ✅ APPROVED or ⚠️ PENDING decision
5. Click: "Show Reasoning Logs"
6. See: All 6 validation tools and results

---

## 🛠️ Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check for TypeScript errors
npx tsc --noEmit

# Format code
npm run lint
```

---

## 📞 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**TypeScript errors?**
```bash
# They should all be fixed, but if you see any:
npm run lint
```

**Components not loading?**
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

---

## 🎓 Learning Path

1. **First**: Run the app and try a few customer IDs
2. **Second**: Check README.md for full documentation
3. **Third**: Read ARCHITECTURE_GUIDE.md for system design
4. **Fourth**: Explore the code:
   - `lib/agent.ts` - How decisions are made
   - `lib/tools.ts` - Individual validation functions
   - `components/ChatInterface.tsx` - UI implementation
5. **Fifth**: Try extending it (see ARCHITECTURE_GUIDE.md)

---

## ✨ That's It!

You now have a fully functional AI Customer Support Agent. 

**Next Steps:**
- Explore the code
- Try different customer IDs
- Read the documentation
- Understand the architecture
- Consider how to extend it

Enjoy! 🚀
