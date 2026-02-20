import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-base-content/70">
          Have questions about{" "}
          <span className="text-primary font-semibold">SecureExam</span>? We are
          here to help.
        </p>
      </div>

      {/* Contact Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-base-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-primary to-teal-400 text-white p-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-8 text-white/90">
            Fill out the form and our Team AlphaDevs will get back to you within
            24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiPhone className="text-xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm opacity-90">+8801306979918</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-90">
                  malam2331103@bscse.uiu.ac.bd
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin className="text-xl" />
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-sm opacity-90">
                  Team AlphaDevs HQ <br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <p className="mt-16 text-sm opacity-80">
            © 2026 SecureExam by AlphaDevs. All rights reserved.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-10 bg-base-100">
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">I am a..</label>
                <select className="select select-bordered w-full">
                  <option>Student</option>
                  <option>Teacher</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Subject</label>
              <input
                type="text"
                placeholder="Exam Issue / Technical Support"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Message</label>
              <textarea
                className="textarea textarea-bordered w-full h-28"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button className="btn btn-primary w-full">
              Send Message <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
