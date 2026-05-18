# 🌍 WanderLust - A Booking Platform

A full-stack web application for discovering, listing, and reviewing vacation rentals. Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, deployed on **Render**.

🌐 **Live Demo:** [https://wonderlust-rtda.onrender.com](https://wonderlustt-1.onrender.com/)  
📂 **GitHub:** [Gaurav200604/WonderLustt](https://github.com/Gaurav200604/WonderLustt)

---

## ✨ Features

### 🏠 **Listings**
- Browse all vacation rental listings
- Search listings by title, location, or country
- View detailed listing information with images
- Create new listings (authenticated users only)
- Edit and delete your own listings
- Image upload to Cloudinary

### ⭐ **Reviews**
- Read reviews from other travelers
- Post reviews with ratings (1-5 stars)
- Delete your own reviews
- Reviews persist with listing data

### 👤 **User Authentication**
- Secure user registration and login
- Password hashing with `passport-local-mongoose`
- Session management with MongoDB store
- Role-based access control (owner, reviewer)
- Auto-redirect to attempted page after login

### 📸 **Image Management**
- Upload listing images via Cloudinary
- Responsive image display
- Image thumbnail generation

### 🔐 **Security & Validation**
- Input validation using Joi
- CSRF protection via method-override
- Server-side error handling
- Environment variables for sensitive data

---

## 🛠️ **Tech Stack**

| Layer | Technology |
|-------|-----------|
| **Frontend** | EJS, Bootstrap, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Passport.js, Passport-Local |
| **Image Storage** | Cloudinary |
| **Deployment** | Render |
| **Session Store** | MongoDB (connect-mongo) |

---

## 📋 **Installation & Setup**

### **Prerequisites**
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Git

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Gaurav200604/WonderLustt.git
cd WonderLustt
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Create `.env` File**
Create a file named `.env` in the project root:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

ATLASDB_URL=mongodb+srv://username:password@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority

SECRET=your_session_secret_key
```

### **Step 4: Get Credentials**

#### **MongoDB Atlas**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Copy the connection string and replace `username:password`
5. Paste in `ATLASDB_URL` in `.env`

#### **Cloudinary**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Paste in `.env`

#### **Secret Key**
Generate a random string for session encryption:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Step 5: Run Locally**

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Open browser and visit: **http://localhost:8080**

---

## 📁 **Project Structure**

```
WonderLustt/
│
├── app.js                    # Main Express app
├── cloudConfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware (auth, validation)
├── schema.js                 # Joi validation schemas
│
├── models/
│   ├── listing.js           # Listing schema
│   ├── review.js            # Review schema
│   └── user.js              # User schema
│
├── routes/
│   ├── listing.js           # Listing routes (CRUD)
│   ├── review.js            # Review routes
│   └── user.js              # Auth routes (signup, login, logout)
│
├── controlers/              # Route handlers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── views/                   # EJS templates
│   ├── layouts/boilerplate.ejs    # Base layout
│   ├── listings/
│   │   ├── index.ejs              # All listings
│   │   ├── new.ejs               # Create listing form
│   │   ├── edit.ejs              # Edit listing form
│   │   └── show.ejs              # Listing details
│   ├── users/
│   │   ├── signup.ejs
│   │   └── login.ejs
│   └── error.ejs
│
├── public/
│   └── css/
│       └── style.css             # Custom styles
│
├── utils/
│   ├── expresserror.js      # Custom error class
│   └── wrapasyncn.js        # Async error wrapper
│
├── package.json             # Dependencies
└── .env                     # Environment variables (not committed)
```

---

## 🚀 **Usage Guide**

### **Homepage**
- View all available listings
- Use search bar to filter by title, location, or country

### **Create a Listing**
1. Click **"Add Listing"**
2. Fill in details: title, description, price, location, country
3. Upload property image
4. Click **"Create"**

### **View Listing Details**
- Click on any listing card
- See full description, price, location, owner, and reviews
- Add or read reviews (must be logged in)

### **Post a Review**
1. Click on a listing
2. Scroll to reviews section
3. Add rating (1-5 stars) and comment
4. Click **"Add Review"**

### **Edit/Delete Listing**
- Only listing owner can edit or delete
- Click **"Edit"** or **"Delete"** on listing detail page

### **User Account**
- **Sign Up:** Register with username, email, password
- **Log In:** Enter credentials
- **Log Out:** Click logout in navbar

---

## 🚢 **Render Deploy Notes**

If your deployed site is not updating after a GitHub push, check these Render settings first:

1. Make sure the service is linked to the same branch you push to, usually `main`.
2. In Render, open the service settings and set **Auto-Deploy** to **On Commit**.
3. Avoid commit messages that include `[skip render]` or `[render skip]`, because Render will ignore those pushes.
4. If a deploy fails, fix the build error in Render’s Events or Logs view, then redeploy.
5. Use **Deploy latest commit** once after changing settings so Render starts from the newest GitHub commit.

If you want the repository to define the Render service more explicitly, add a `render.yaml` Blueprint in the repo root and redeploy from that blueprint.

---

## 📡 **API Routes**

### **Listings**
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Show create form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | View listing details |
| GET | `/listings/:id/edit` | Show edit form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

### **Reviews**
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewid` | Delete review |

### **Users**
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/signup` | Show signup form |
| POST | `/signup` | Register user |
| GET | `/login` | Show login form |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |

---

## 🎨 **Screenshots**

### **Homepage - Browse Listings**
![Homepage](./public/screenshots/homepage.png)  
*View all available vacation rentals with search functionality*

### **Listing Details**
![Listing Details](./public/screenshots/listing-detail.png)  
*See full property information, images, and reviews*

### **Create New Listing**
![Create Listing](./public/screenshots/create-listing.png)  
*Upload property details and images to Cloudinary*

### **User Authentication**
![Login](./public/screenshots/login.png)  
*Secure login with session management*

### **Reviews Section**
![Reviews](./public/screenshots/reviews.png)  
*Read and post reviews with star ratings*

---

## 🌐 **Deployment on Render**

### **Step 1: Connect GitHub**
1. Go to [Render](https://render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Select branch: `main`

### **Step 2: Configure Service**
- **Build Command:** `npm install` (auto-detected)
- **Start Command:** `npm start`
- **Environment:** Node.js (auto-detected)

### **Step 3: Add Environment Variables**
In Render Dashboard → Service → **Environment**:
```
ATLASDB_URL=your_mongodb_url
SECRET=your_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### **Step 4: Deploy**
- Click **"Manual Deploy"** → **"Deploy latest commit"**
- Check logs for `Successfully connected to DB.` and `Server is listening on port ...`
- Visit deployed URL once deployment is complete

### **Auto-Deploy (Optional)**
- Enable **"Auto-Deploy"** for automatic deploys on every push to `main`

---

## 🔧 **Environment Variables Reference**

```env
# Cloudinary (Image Storage)
CLOUD_NAME=           # Your Cloudinary cloud name
CLOUD_API_KEY=        # Your Cloudinary API key
CLOUD_API_SECRET=     # Your Cloudinary API secret

# MongoDB Atlas
ATLASDB_URL=          # MongoDB connection string with auth

# Session
SECRET=               # Random string for session encryption
NODE_ENV=production   # Set to 'production' on Render
```

⚠️ **Security Note:** Never commit `.env` to version control. It's already in `.gitignore`.

---

## 🚨 **Troubleshooting**

### **"Cannot init client" Error**
- ✅ Verify `ATLASDB_URL` is set in Render Environment
- ✅ Add Render IPs to MongoDB Atlas → Network Access

### **Images Not Uploading**
- ✅ Check Cloudinary credentials in `.env`
- ✅ Verify `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`

### **Login Not Working**
- ✅ Ensure `SECRET` is set in Render Environment
- ✅ Check MongoDB connection is active

### **Port Already in Use**
```bash
# Kill process on port 8080
npx kill-port 8080
```

---

## 📦 **Dependencies**

**Core:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `ejs` - Template engine
- `passport` - Authentication

**Database & Storage:**
- `connect-mongo` - Session store
- `cloudinary` - Image hosting
- `multer` - File upload

**Security:**
- `passport-local-mongoose` - Password hashing
- `express-session` - Session management
- `joi` - Input validation

**Utilities:**
- `dotenv` - Environment variables
- `method-override` - HTTP method override
- `connect-flash` - Flash messages

See [package.json](./package.json) for complete list with versions.

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📝 **License**

This project is **open source** and available under the [ISC License](LICENSE).

---

## 🙋 **Support**

- 📧 Email: gaurav200604@gmail.com
- 🐛 Found a bug? Open an [issue](https://github.com/Gaurav200604/WonderLustt/issues)
- ⭐ Like the project? Star it on GitHub!

---

## 🎓 **Learning Resources**

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Passport.js Authentication](http://www.passportjs.org/)
- [Cloudinary Upload API](https://cloudinary.com/documentation/upload_api_reference)
- [EJS Templating](https://ejs.co/)

---

## ✅ **Checklist for First-Time Users**

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Create `.env` with credentials
- [ ] Add MongoDB Atlas connection string
- [ ] Add Cloudinary API keys
- [ ] Generate and add `SECRET`
- [ ] Run locally (`npm start` or `npm run dev`)
- [ ] Test user signup/login
- [ ] Create a test listing
- [ ] Add a test review
- [ ] Visit production URL

---

Made by [Gaurav Kumar](https://github.com/Gaurav200604)

**Last Updated:** May 2026
