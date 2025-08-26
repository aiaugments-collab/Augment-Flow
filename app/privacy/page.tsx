import StaticPageLayout from '../components/StaticPageLayout';

export default function PrivacyPage() {
  return (
    <StaticPageLayout>
      <h1 className="text-3xl font-medium font-heading">Privacy Policy</h1>
      <p className="text-muted-foreground mt-2">Last updated: July 28, 2025</p>
      
      <div className="bg-background bg-opacity-50 border border-border rounded-xl p-8 shadow-lg">
        <div className="space-y-8">
          <section className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This policy describes what information we collect when you use our sites, services and content (&quot;Services&quot;). 
              It also provides information about how we store, transfer, use, and delete that information, and what choices 
              you have with respect to the information. This policy is designed to ensure that we safely handle your data 
              in accordance with relevant regulations and legislations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please review our Privacy Policy carefully, as your use of Services constitutes your agreement to it. This policy 
              applies to our website, content portals, and applications (collectively &quot;the platform&quot;), as well as other interactions 
              you may have with us (e.g., customer support conversations etc) and is supplementary to our Terms of Service. In the 
              event of any inconsistency or conflict between this Policy and our Terms of service, this Policy will govern. You have 
              been provided an opportunity to freely access the policy and agree to our Terms and Conditions before using our Services, 
              having regard to relevant laws.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Definitions</h2>
            <p className="text-muted-foreground leading-relaxed">
              &quot;Platform&quot; shall mean Services offered by Augment Flow (&quot;Company&quot;, &quot;We&quot;, &quot;Augment Flow&quot; or &quot;Us&quot;) through 
              our website or other linked pages, products, software(s) i.e, websites, API keys, features, content, or application services.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              &quot;User or You&quot; A user of our Platform (&quot;End-User&quot;, &quot;you&quot; or &quot;User&quot;);
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to safeguarding the privacy of our users. Our business model is to provide service to users who need 
              to access to seamless auto task completion system. Therefore, our business model attempts to limit widespread collection 
              of general user data. We will only collect and process information that we need to deliver the service to you, and to 
              continue to maintain and develop the service.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6 text-foreground">General Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              If you choose to register with us and avail our services, you may have to provide your name and pronoun, a valid 
              communication details including email and phone number, and (optionally) the area where you live. You must enter a 
              valid communication detail so that we may send you verification codes to verify your account and other important text 
              notifications regarding any activity in your account. If at any time you have changed or decide to change your communication 
              details, you agree to be solely responsible for updating the information with us. During the process of using the Services 
              offered by us, we access account details, Basic information needed for your account, Service data as to how you use our 
              platform, technical information as to your device and browser details and your content. Thus, we require this information 
              in order to deliver the Service to you as user. Processing this information is required for fulfilling the contract we 
              entered into with you, at your request (our Terms and Conditions).
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6 text-foreground">User Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Like most digital services, our systems automatically collect information about how you use the Platform. This may include 
              your IP address, geographical location, browser type and version, operating system, referral source, length of visit, page 
              views and website navigation paths, as well as information about the timing, frequency and pattern of your use. The source 
              of the usage data is our analytics tracking system or the technical log data. We require this information in order to analyse 
              the way people use the Platform and in order to build aggregate quantitative usage reports. We reserve the right to share 
              such usage report securely on our Platform to aid other Users. The legal basis for this processing is for namely using this 
              data for the purpose of ensuring the proper administration of our website and business, analyzing the use of the website and 
              services, monitoring and improving our website and services, improving the user experience, preventing abuse, and assisting 
              users with support inquiries.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6 text-foreground">Prohibited Disclosure</h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not disclose personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, 
              or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a 
              natural person, data concerning health or data concerning a natural person's sex life or sexual orientation or any other 
              sensitive personal information.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Right to Erase</h2>
            <p className="text-muted-foreground leading-relaxed">
              User has the right to withdraw their previously given consent and have the information erased from our system for the data 
              that is no longer necessary for the purpose that it is shared. However, doesn&apos;t mean that Your data will be erased immediately, 
              it will still be stored at our facility in order to comply with numerous statutory obligations and Applicable Laws. After this 
              period has elapsed, Your Data will be deleted from our records.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security and Breaches</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information collected as per this Policy is protected by security controls consistent with Industry Standards and we have 
              adopted all viable Security measures to protect the data collected.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any complaints, abuse or concerns with regards to content and or comment or breach of these terms shall be immediately 
              informed to us via email at:
            </p>
            <p className="text-muted-foreground leading-relaxed font-semibold mt-4">
              E-mail: <a href="mailto:info@augmentflow.io" className="text-primary hover:text-primary/80 transition-colors">info@augmentflow.io</a>
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mt-6 font-semibold">Last Updated: July 28, 2025</p>
          </section>
        </div>
      </div>
    </StaticPageLayout>
  );
}
