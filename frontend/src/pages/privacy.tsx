// Libraries
import Head from 'next/head';
import Cookies from 'cookies';
import { GetServerSideProps } from "next";

// Components
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { PageWrapper } from '@/components/UI/PageWrapper';

// Utils
import { getUser } from '@/lib/getData';

// Types
import { IUser } from '@/utils/types';

interface IProps {
    user: IUser
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');
    const user = await getUser(token);

    return {
        props: {
            user
        }
    }
}

export default function Privacy(props: IProps) {
    return (
        <PageWrapper user={props.user} title="World of Gaian - Privacy Policy">
            <div className="privacy">
                <h1 className="text-3xl"><strong>PRIVACY POLICY</strong></h1>
                <p>Last updated June 25, 2023</p>
                <div className="mt-5">
                    <p>This privacy notice for World of Gaian, LLC ("Company,""we,""us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you: </p>
                    <ul className='list-disc ml-[10%] my-3'>
                        <li className='my-3'>Visit our website, or any website of ours that links to this privacy notice.</li>
                        <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                    </ul>
                    <p><strong>Questions or concerns? </strong>Reading this privacy notice will help you understand the privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at worldofgaian@gmail.com.</p>
                </div>
                {/* Check links in Summary */}
                <div className="mt-5">
                    <h2 className="text-lg mb-5"><strong>SUMMARY OF KEY POINTS</strong></h2>
                    <p><strong>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <a href="#table">table of contents</a> below to find the section you're looking for.</strong></p>
                    <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with World of Gaian, LLC and the Services, the choices you make, and the products and features you use. Learn more about <a href="#infocollect">personal information you disclose to us.</a></p>
                    <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
                    <p><strong>Do we receive any information from third parties?</strong> We do not receive any information from third parties.</p>
                    <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#infouse">how we process your information</a></p>
                    <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacyrights">your privacy rights.</a></p>
                    <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a <a href="https://app.termly.io/notify/0ab06662-35de-4bf4-b5ab-4a1c90984b15">data subject access request</a>, or by contacting us.</p>
                </div>
                <div id="table" className="my-5">
                    <h2 className="text-xl mb-5"><strong>TABLE OF CONTENTS</strong></h2>
                    <ol className="leading-7">
                        <li><a href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a></li>
                        <li><a href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                        <li><a href="#legalbases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                        <li><a href="#whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                        <li><a href="#sociallogins">5.HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                        <li><a href="#inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                        <li><a href="#infosafe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                        <li><a href="#infominors">8. DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                        <li><a href="#privacyrights">9. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                        <li><a href="#DNT">10. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                        <li><a href="#caresidents">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS</a></li>
                        <li><a href="#policyupdates">12. DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                        <li><a href="#contact">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                        <li><a href="#request">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE DATA WE COLLECT FROM YOU?</a></li>
                    </ol>
                </div>
                <div id="infocollect" className="my-5">
                    <h2 className="text-xl mb-5"><strong>1. WHAT INFORMATION DO WE COLLECT?</strong></h2>
                    <h3 className="mb-5"><strong>Personal information you disclose to us</strong></h3>
                    <p><strong>In Short: </strong><em>We collect information that you provide us.</em></p>
                    <p>We collect personal information you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our product and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                    <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                    <ul className="list-disc ml-[10%] my-5">
                        <li>email addresses</li>
                        <li>names</li>
                    </ul>
                    <p><strong>Sensitive Information.</strong> We do not process sensitive information</p>
                    <p><strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register this way, we will collect the information described in the section called <a href="#sociallogins">"HOW DO WE HANDLE YOUR SOCIAL LOGINS?"</a> below.</p>
                    <p>All persoanl information that you provide us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
                </div>
                <div id="infouse" className="my-5">
                    <h2 className="text-xl mb-5"><strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong></h2>
                    <p><em><strong>In Short: </strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>
                    <p><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
                    <ul className="list-disc leading-7 ml-[10%]">
                        <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                        <li><strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services</li>
                        <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services</li>
                        <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect and individual's vital interest, such as to prevent harm.</li>
                    </ul>
                </div>
                <div id="legalbases" className="my-5">
                    <h2 className="text-xl mb-5"><strong>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</strong></h2>
                    <p><em><strong>In Short: </strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>
                    <p><em><strong>If you are located in the EU or UK, this section applies to you.</strong></em></p>
                    <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
                    <ul className="list-disc leading-7 ml-[10%] my-5">
                        <li><strong>Consent. </strong>We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about <a href="#withdrawconsent">withdrawing your consent.</a></li>
                        <li><strong>Performance of a Contract. </strong>We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
                        <li><strong>Legitimate Interests. </strong>We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to understand how our users use our products and services so we can improve user experience.</li>
                        <li><strong>Legal Obligations. </strong>We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                        <li><strong>Vital Interests. </strong>We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                    </ul>
                    <p><em><strong>If you are located in Canada, this section applies to you.</strong></em></p>
                    <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can <a href="#withdrawconsent">withdraw your consent</a> at any time.</p>
                    <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                    <ul className="list-disc leading-7 ml-[10%]">
                        <li>If collect is cleared in the interests of an individual and consent cannot be obtained in a timely way</li>
                        <li>For investigations and fraud detection and prevention</li>
                        <li>For business transactions provided certain conditions are met</li>
                        <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                        <li>For indentifying injured, ill, or deceased persons and communicating with next of kin</li>
                        <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                        <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or contravention of the laws of Canada or a province</li>
                        <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                        <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                        <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                        <li>If the information is publicly available and is specified by the regulations</li>
                    </ul>
                </div>
                <div id="whoshare" className="my-5">
                    <h2 className="text-xl mb-5"><strong>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</strong></h2>
                    <p><em><strong>In Short: </strong>We may share information in specific situations described in this section and/or with the following third parties.</em></p>
                    <p>We may need to share your personal information in the following situations:</p>
                    <ul>
                        <li><strong>Business Transfers. </strong>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                    </ul>
                </div>
                <div id="sociallogins" className="my-5">
                    <h2 className="text-xl mb-5"><strong>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</strong></h2>
                    <p><em><strong>In Short: </strong>If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>
                    <p>Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.</p>
                    <p>We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
                </div>
                <div id="inforetain" className="my-5">
                    <h2 className="text-xl mb-5"><strong>6. HOW LONG DO WE KEEP YOUR INFORMATION?</strong></h2>
                    <p><em><strong>In Short: </strong>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em></p>
                    <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
                    <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
                </div>
                <div id="infosafe" className="my-5">
                    <h2 className="text-xl mb-5"><strong>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong></h2>
                    <p><em><strong>In Short: </strong>We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
                    <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
                </div>
                <div id="infominors" className="my-5">
                    <h2 className="text-xl mb-5"><strong>8. DO WE COLLECT INFORMATION FROM MINORS?</strong></h2>
                    <p><em><strong>In Short: </strong>We do not knowingly collect data from or market to children under 18 years of age.</em></p>
                    <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at worldofgaian@gmail.com.</p>
                </div>
                <div id="privacyrights" className="my-5">
                    <h2 className="text-xl mb-5"><strong>9. WHAT ARE YOUR PRIVACY RIGHTS?</strong></h2>
                    <p><em><strong>In Short: </strong>In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</em></p>
                    <p>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section <a href="#contact">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.</a></p>
                    <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
                    <p>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a href="https://ec.europa.eu/newsroom/article29/items/612080/en" target="_blank">Member State data protection authority</a> or <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank">UK data protection authority.</a></p>
                    <p>If you are located in Switzerland, you may contact the <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">Federal Data Protection and Information Commissioner.</a></p>
                    <p id="withdrawconsent" className="mb-3"><strong>Withdrawing your consent: </strong>If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <a href="#contact">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a> below.</p>
                    <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                    <h3 className="mb-3"><strong>Account Information</strong></h3>
                    <p>If you would at any time like to review or change the information in your account or terminate your account, you can: Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
                    <p>If you have questions or comments about your privacy rights, you may email us at worldofgaian@gmail.com.</p>
                </div>
                <div id="DNT" className="my-5">
                    <h2 className="text-xl mb-5"><strong>10. CONTROLS FOR DO-NOT-TRACK FEATURES</strong></h2>
                    <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
                </div>
                <div id="caresidents" className="my-5">
                    <h2 className="text-xl mb-5"><strong>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</strong></h2>
                    <p><em><strong>In Short: </strong>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em></p>
                    <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
                    <p>If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).</p>
                </div>
                <div id="policyupdates" className="my-5">
                    <h2 className="text-xl mb-5"><strong>12. DO WE MAKE UPDATES TO THIS NOTICE?</strong></h2>
                    <p><em><strong>In Short: </strong>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
                    <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
                </div>
                <div id="contact" className="my-5">
                    <h2 className="text-xl mb-5"><strong>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong></h2>
                    <p>If you have questions or comments about this notice, you may email us at worldofgaian@gmail.com</p>
                </div>
                <div id="request" className="my-5">
                    <h2 className="text-xl mb-5"><strong>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</strong></h2>
                    <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a <a href="https://app.termly.io/notify/0ab06662-35de-4bf4-b5ab-4a1c90984b15" target="_blank">data subject access request.</a></p>
                    <p>This privacy policy was created using Termly's <a href="https://termly.io/products/privacy-policy-generator/" target="_blank">Privacy Policy Generator.</a></p>
                </div>
            </div>
        </PageWrapper>
    )
}