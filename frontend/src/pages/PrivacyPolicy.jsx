import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
          <p className="text-black text-sm">
            This Privacy Policy describes how your personal information is
            collected and used when you visit or make a purchase from
            gearmates.vercel.app (the "Site").
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-black">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Personal Information We Collect
            </h2>
            <p className="text-black leading-relaxed mb-4">
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site and information about how you interact with the Site.
              We refer to this automatically-collected information as "Device
              Information".
            </p>
            <p className="text-black leading-relaxed">
              Additionally, when you make a purchase or attempt to make a
              purchase through the Site, we collect certain information from
              you, including your name, billing address, shipping address,
              payment information, email address, and phone number. We refer to
              this information as "Order Information".
            </p>
            <p className="text-black leading-relaxed mt-4">
              When we talk about "Personal Information" in this Privacy Policy,
              we are talking about both Device Information and Order
              Information.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              How Do We Use Your Personal Information?
            </h2>
            <p className="text-black leading-relaxed mb-4">
              We use the Order Information that we collect generally to fulfill
              any orders placed through the Site (including processing your
              payment information, arranging for shipping, and providing you
              with invoices and/or order confirmations). Additionally, we use
              this Order Information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black ml-4">
              <li>Communicate with you</li>
              <li>Screen our orders for potential risk or fraud</li>
              <li>
                When in line with the preferences you have shared with us,
                provide you with information or advertising relating to our
                products or services
              </li>
            </ul>
            <p className="text-black leading-relaxed mt-4">
              We use the Device Information that we collect to help us screen
              for potential risk and fraud (in particular, your IP address), and
              more generally to improve and optimize our Site (for example, by
              generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and
              advertising campaigns).
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Behavioral Advertising
            </h2>
            <p className="text-black leading-relaxed">
              As described above, we use your Personal Information to provide
              you with targeted advertisements or marketing communications we
              believe may be of interest to you.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Your Rights
            </h2>
            <p className="text-black leading-relaxed">
              You have the right to access personal information we hold about
              you and to ask that your personal information be corrected,
              updated, or deleted. If you would like to exercise this right,
              please contact us through the contact information below.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Data Retention
            </h2>
            <p className="text-black leading-relaxed">
              When you place an order through the Site, we will maintain your
              Order Information for our records until and unless you ask us to
              delete this information.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Contact Us
            </h2>
            <p className="text-black leading-relaxed">
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact us by e‑mail:{" "}
              <a
                href="mailto:gearmates.info@gmail.com"
                className="text-red-600 hover:underline"
              >
                gearmates.info@gmail.com
              </a>{" "}
              or Mob: 9205163669.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
