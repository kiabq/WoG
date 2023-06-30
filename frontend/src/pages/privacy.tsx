// Libraries
import Head from 'next/head';

// Components
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function Privacy() {
    return (
        <>
            <Head>
                <title>World of Gaian - Privacy Policy</title>
            </Head>
            <Header />
            <main className='max-w-screen-lg px-6 mx-auto my-16'>
                <div>
                    <h1><strong>PRIVACY POLICY</strong></h1>
                    <p>Last updated June 25, 2023</p>
                    <div>
                        <p>This privacy notice for World of Gaian, LLC ("Company,""we,""us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you: </p>
                        <ul>
                            <li>Visit our website, or any website of ours that links to this privacy notice.</li>
                            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                        </ul>
                        <p>Questions or concerns? Reading this privacy notice will help you understand the privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at worldofgaian@gmail.com.</p>
                    </div>
                    {/* Check links in Summary */}
                    <div>
                        <h2><strong>SUMMARY OF KEY POINTS</strong></h2>
                        <p><strong>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <a href="#table">table of contents</a> below to find the section you're looking for.</strong></p>
                        <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with World of Gaian, LLC and the Services, the choices you make, and the products and features you use. Learn more about <a href="#">personal information you disclose to us.</a></p>
                        <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
                        <p><strong>Do we receive any information from third parties?</strong> We do not receive any information from third parties.</p>
                        <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="">how we process your information</a></p>
                        <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#">your privacy rights.</a></p>
                        <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a <a href="https://app.termly.io/notify/0ab06662-35de-4bf4-b5ab-4a1c90984b15">data subject access request</a>, or by contacting us.</p>
                    </div>
                    <div>
                        <h2><strong>TABLE OF CONTENTS</strong></h2>
                        <ol>
                            <li><a href="#">WHAT INFORMATION DO WE COLLECT?</a></li>
                            <li><a href="#">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                            <li><a href="#">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                            <li><a href="#">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                            <li><a href="#">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                            <li><a href="#">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                            <li><a href="#">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                            <li><a href="#">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                            <li><a href="#">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                            <li><a href="#">DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS</a></li>
                            <li><a href="#">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                            <li><a href="#">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                            <li><a href="#">HOW CAN YOU REVIEW, UPDATE, OR DELETE DATA WE COLLECT FROM YOU?</a></li>
                        </ol>
                    </div>
                    <div>
                        <h2><strong>1. WHAT INFORMATION DO WE COLLECT?</strong></h2>
                        <h3><strong>Personal information you disclose to us</strong></h3>
                        <p><strong>In Short: </strong><em>We collect information that you provide us.</em></p>
                        <p>We collect personal information you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our product and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                        <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                        <ul>
                            <li>email addresses</li>
                            <li>names</li>
                        </ul>
                        <p><strong>Sensitive Information.</strong> We do not process sensitive information</p>
                        <p><strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register this way, we will collect the information described in the section called <a href="#">"HOW DO WE HANDLE YOUR SOCIAL LOGINS?"</a> below.</p>
                        <p>All persoanl information that you provide us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
                    </div>
                    <div>
                        <h2><strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong></h2>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )

}