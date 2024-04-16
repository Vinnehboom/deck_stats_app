/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import { Center, Button, Modal, Image, Text, ScrollView } from "native-base";
import { useTranslation } from "react-i18next";

import { TandCStyle } from "../../styles/TandCStyle";

export const TermsAndConditions = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <Center>
      <Button onPress={() => setShowModal(true)} variant="ghost">
        <Image
          alt="poke-ball-terms-and-privacy"
          style={TandCStyle.image}
          source={require("../../assets/images/pokeball_bit.png")}
        />
        <Text>{t("LOGIN_SCREEN.T&C")}</Text>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>
            <Modal.CloseButton />
            <Text fontWeight="bold" marginY={2}>
              CONDITIONS & PRIVACY Last updated March 20, 2024
            </Text>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text fontWeight="bold" marginY={4}>
                COPYRIGHT & IP
              </Text>
              <Text textAlign="justify" marginY={2}>
                The literal and graphical information presented in this app about the Pokémon Trading Card Game, including card
                images and text, is copyright The Pokémon Company (Pokémon), Nintendo, Game Freak and/or Creatures. VS Log is not
                produced by, endorsed by, supported by, or affiliated with Pokémon, Nintendo, Game Freak or Creatures. No
                copyright infringement intended.
              </Text>
              <Text fontWeight="bold" marginY={4}>
                PRIVACY
              </Text>
              <Text textAlign="justify" marginY={2}>
                This privacy notice for Vinnie Schelfhaut ("we," "us," or "our"), describes how and why we might collect, store,
                use, and/or share ("process") your information when you use our services ("Services"), such as when you: Download
                and use our mobile application (VS. Log), or any other application of ours that links to this privacy notice
                Engage with us in other related ways, including any sales, marketing, or events Questions or concerns? Reading
                this privacy notice will help you understand your privacy rights and choices. If you do not agree with our
                policies and practices, please do not use our Services.{" "}
              </Text>
              <Text fontWeight="bold" marginY={2}>
                SUMMARY OF KEY POINTS
              </Text>
              <Text marginY={2} textAlign="justify">
                This summary provides key points from our privacy notice, but you can find out more details about any of these
                topics by clicking the link following each key point or by using our table of contents below to find the section
                you are looking for.
              </Text>
              <Text marginY={2}>
                What personal information do we process? When you visit, use, or navigate our Services, we may process personal
                information depending on how you interact with us and the Services, the choices you make, and the products and
                features you use. Learn more about personal information you disclose to us.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold">Do we process any sensitive personal information?</Text> We do not process sensitive
                personal information.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold">Do we receive any information from third parties?</Text>
                We do not receive any information from third parties.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold">How do we process your information? </Text>
                We process your information to provide, improve, and administer our Services, communicate with you, for security
                and fraud prevention, and to comply with law. We may also process your information for other purposes with your
                consent. We process your information only when we have a valid legal reason to do so. Learn more about how we
                process your information.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold"> In what situations and with which parties do we share personal information? </Text>
                We may share information in specific situations and with specific third parties. Learn more about when and with
                whom we share your personal information.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold"> How do we keep your information safe? </Text>
                We have organizational and technical processes and procedures in place to protect your personal information.
                However, no electronic transmission over the internet or information storage technology can be guaranteed to be
                100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties
                will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn
                more about how we keep your information safe.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold">What are your rights?</Text>
                Depending on where you are located geographically, the applicable privacy law may mean you have certain rights
                regarding your personal information. Learn more about your privacy rights.
              </Text>
              <Text marginY={2}>
                <Text fontWeight="bold">How do you exercise your rights?</Text>
                The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in
                accordance with applicable data protection laws.
              </Text>
              <Text marginY={2}>
                Want to learn more about what we do with any information we collect? Review the privacy notice in full.
              </Text>
              <Text fontWeight="bold" marginY={4}>
                CONDITIONS
              </Text>
              <Text fontWeight="bold" marginY={2}>
                AGREEMENT TO OUR LEGAL TERMS
              </Text>
              <Text textAlign="justify">
                We are Vinnie Schelfhaut. We operate the mobile application VS Log (the "App"), as well as any other related
                products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                You can contact us by email at vinnieschelfhaut@gmail.com . These Legal Terms constitute a legally binding
                agreement made between you, whether personally or on behalf of an entity ("you"), and Vinnie Schelfhaut,
                concerning your access to and use of the Services. You agree that by accessing the Services, you have read,
                understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS,
                THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental
                terms and conditions or documents that may be posted on the Services from time to time are hereby expressly
                incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications
                to these Legal Terms from time to time. We will alert you about any changes by updating the "Last updated" date of
                these Legal Terms, and you waive any right to receive specific notice of each such change. It is your
                responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and
                will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your
                continued use of the Services after the date such revised Legal Terms are posted. All users who are minors in the
                jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly
                supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or
                guardian read and agree to these Legal Terms prior to you using the Services. We recommend that you print a copy
                of these Legal Terms for your records.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                1. OUR SERVICES
              </Text>
              <Text textAlign="justify">
                The information provided when using the Services is not intended for distribution to or use by any person or
                entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or
                which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those
                persons who choose to access the Services from other locations do so on their own initiative and are solely
                responsible for compliance with local laws, if and to the extent local laws are applicable. The Services are not
                tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act
                (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to
                such laws, you may not use the Services. You may not use the Services in a way that would violate the
                Gramm-Leach-Bliley Act (GLBA).
              </Text>
              <Text fontWeight="bold" marginY={2}>
                2. INTELLECTUAL PROPERTY RIGHTS
              </Text>
              <Text marginY={2}> Our intellectual property</Text>
              <Text textAlign="justify">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code,
                databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services
                (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the
                "Marks"). Our Content and Marks are protected by copyright and trademark laws (and various other intellectual
                property rights and unfair competition laws) and treaties in the United States and around the world. The Content
                and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal
                business purpose only.
              </Text>
              <Text marginY={2}>Your use of our Services</Text>
              <Text textAlign="justify">
                Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant
                you a non-exclusive, non-transferable, revocable license to: access the Services; and download or print a copy of
                any portion of the Content to which you have properly gained access. solely for your personal, non-commercial use
                or internal business purpose. Except as set out in this section or elsewhere in our Legal Terms, no part of the
                Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly
                displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any
                commercial purpose whatsoever, without our express prior written permission. If you wish to make any use of the
                Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address
                your request to: vinnieschelfhaut@gmail.com. If we ever grant you the permission to post, reproduce, or publicly
                display any part of our Services or Content, you must identify us as the owners or licensors of the Services,
                Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting,
                reproducing, or displaying our Content. We reserve all rights not expressly granted to you in and to the Services,
                Content, and Marks. Any breach of these Intellectual Property Rights will constitute a material breach of our
                Legal Terms and your right to use our Services will terminate immediately.
              </Text>
              <Text marginY={2}> Your submissions and contributions</Text>
              <Text textAlign="justify">
                Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to
                understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the
                Services. Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other
                information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such
                Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination
                for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. Contributions: The
                Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other
                functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast
                content and materials to us or through the Services, including but not limited to text, writings, video, audio,
                photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material
                ("Contributions"). Any Submission that is publicly posted shall also be treated as a Contribution. You understand
                that Contributions may be viewable by other users of the Services and possibly through third-party websites. When
                you post Contributions, you grant us a license (including use of your name, trademarks, and logos): By posting any
                Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable,
                royalty-free, fully-paid, worldwide right, and license to: use, copy, reproduce, distribute, sell, resell,
                publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or
                in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any
                purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works,
                your Contributions, and to sublicense the licenses granted in this section. Our use and distribution may occur in
                any media formats and through any media channels. This license includes our use of your name, company name, and
                franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and
                commercial images you provide. You are responsible for what you post or upload: By sending us Submissions and/or
                posting Contributions through any part of the Services or making Contributions accessible through the Services by
                linking your account through the Services to any of your social networking accounts, you: confirm that you have
                read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the
                Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory,
                obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false,
                inaccurate, deceitful, or misleading; to the extent permissible by applicable law, waive any and all moral rights
                to any such Submission and/or Contribution; warrant that any such Submission and/or Contributions are original to
                you or that you have the necessary rights and licenses to submit such Submissions and/or Contributions and that
                you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or
                Contributions; and warrant and represent that your Submissions and/or Contributions do not constitute confidential
                information. You are solely responsible for your Submissions and/or Contributions and you expressly agree to
                reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third
                party’s intellectual property rights, or (c) applicable law. We may remove or edit your Content: Although we have
                no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any
                time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these
                Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report
                you to the authorities.
              </Text>
              <Text marginY={2}>Copyright infringement</Text>
              <Text textAlign="justify">
                We respect the intellectual property rights of others. If you believe that any material available on or through
                the Services infringes upon any copyright you own or control, please immediately refer to the "COPYRIGHT
                INFRINGEMENTS" section below.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                3. USER REPRESENTATIONS
              </Text>
              <Text textAlign="justify">
                By using the Services, you represent and warrant that: (1) all registration information you submit will be true,
                accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such
                registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal
                Terms; (4) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental
                permission to use the Services; (5) you will not access the Services through automated or non-human means, whether
                through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and
                (7) your use of the Services will not violate any applicable law or regulation. If you provide any information
                that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and
                refuse any and all current or future use of the Services (or any portion thereof).
              </Text>
              <Text fontWeight="bold" marginY={2}>
                4. USER REGISTRATION
              </Text>
              <Text textAlign="justify">
                You may be required to register to use the Services. You agree to keep your password confidential and will be
                responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a
                username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or
                otherwise objectionable.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                5. PROHIBITED ACTIVITIES
              </Text>
              <Text textAlign="justify">
                You may not access or use the Services for any purpose other than that for which we make the Services available.
                The Services may not be used in connection with any commercial endeavors except those that are specifically
                endorsed or approved by us. As a user of the Services, you agree not to: Systematically retrieve data or other
                content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or
                directory without written permission from us. Trick, defraud, or mislead us and other users, especially in any
                attempt to learn sensitive account information such as user passwords. Circumvent, disable, or otherwise interfere
                with security-related features of the Services, including features that prevent or restrict the use or copying of
                any Content or enforce limitations on the use of the Services and/or the Content contained therein. Disparage,
                tarnish, or otherwise harm, in our opinion, us and/or the Services. Use any information obtained from the Services
                in order to harass, abuse, or harm another person. Make improper use of our support services or submit false
                reports of abuse or misconduct. Use the Services in a manner inconsistent with any applicable laws or regulations.
                Engage in unauthorized framing of or linking to the Services. Upload or transmit (or attempt to upload or to
                transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming
                (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the
                Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or
                maintenance of the Services. Engage in any automated use of the system, such as using scripts to send comments or
                messages, or using any data mining, robots, or similar data gathering and extraction tools. Delete the copyright
                or other proprietary rights notice from any Content. Attempt to impersonate another user or person or use the
                username of another user. Upload or transmit (or attempt to upload or to transmit) any material that acts as a
                passive or active information collection or transmission mechanism, including without limitation, clear graphics
                interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as
                "spyware" or "passive collection mechanisms" or "pcms"). Interfere with, disrupt, or create an undue burden on the
                Services or the networks or services connected to the Services. Harass, annoy, intimidate, or threaten any of our
                employees or agents engaged in providing any portion of the Services to you. Attempt to bypass any measures of the
                Services designed to prevent or restrict access to the Services, or any portion of the Services. Copy or adapt the
                Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code. Except as permitted
                by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any
                way making up a part of the Services. Except as may be the result of standard search engine or Internet browser
                usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot,
                cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or
                other software. Use a buying agent or purchasing agent to make purchases on the Services. Make any unauthorized
                use of the Services, including collecting usernames and/or email addresses of users by electronic or other means
                for the purpose of sending unsolicited email, or creating user accounts by automated means or under false
                pretenses. Use the Services as part of any effort to compete with us or otherwise use the Services and/or the
                Content for any revenue-generating endeavor or commercial enterprise.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                6. USER GENERATED CONTRIBUTIONS
              </Text>
              <Text textAlign="justify">
                The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
                other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform,
                publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to
                text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other
                material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through
                third-party websites. As such, any Contributions you transmit may be treated as non-confidential and
                non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that: The
                creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying
                of your Contributions do not and will not infringe the proprietary rights, including but not limited to the
                copyright, patent, trademark, trade secret, or moral rights of any third party. You are the creator and owner of
                or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the
                Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and
                these Legal Terms. You have the written consent, release, and/or permission of each and every identifiable
                individual person in your Contributions to use the name or likeness of each and every such identifiable individual
                person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these
                Legal Terms. Your Contributions are not false, inaccurate, or misleading. Your Contributions are not unsolicited
                or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other
                forms of solicitation. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous,
                slanderous, or otherwise objectionable (as determined by us). Your Contributions do not ridicule, mock, disparage,
                intimidate, or abuse anyone. Your Contributions are not used to harass or threaten (in the legal sense of those
                terms) any other person and to promote violence against a specific person or class of people. Your Contributions
                do not violate any applicable law, regulation, or rule. Your Contributions do not violate the privacy or publicity
                rights of any third party. Your Contributions do not violate any applicable law concerning child pornography, or
                otherwise intended to protect the health or well-being of minors. Your Contributions do not include any offensive
                comments that are connected to race, national origin, gender, sexual preference, or physical handicap. Your
                Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or
                any applicable law or regulation. Any use of the Services in violation of the foregoing violates these Legal Terms
                and may result in, among other things, termination or suspension of your rights to use the Services.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                7. CONTRIBUTION LICENSE
              </Text>
              <Text textAlign="justify">
                By posting your Contributions to any part of the Services or making Contributions accessible to the Services by
                linking your account from the Services to any of your social networking accounts, you automatically grant, and you
                represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual,
                non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce,
                disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display,
                reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including,
                without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare
                derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of
                the foregoing. The use and distribution may occur in any media formats and through any media channels. This
                license will apply to any form, media, or technology now known or hereafter developed, and includes our use of
                your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names,
                logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you
                warrant that moral rights have not otherwise been asserted in your Contributions. We do not assert any ownership
                over your Contributions. You retain full ownership of all of your Contributions and any intellectual property
                rights or other proprietary rights associated with your Contributions. We are not liable for any statements or
                representations in your Contributions provided by you in any area on the Services. You are solely responsible for
                your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to
                refrain from any legal action against us regarding your Contributions. We have the right, in our sole and absolute
                discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to
                place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any
                time and for any reason, without notice. We have no obligation to monitor your Contributions.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                8. MOBILE APPLICATION LICENSE
              </Text>
              <Text textAlign="justify">
                <Text marginY={2}>Use License</Text>
                If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited
                right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use
                the App on such devices strictly in accordance with the terms and conditions of this mobile application license
                contained in these Legal Terms. You shall not: (1) except as permitted by applicable law, decompile, reverse
                engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any modification,
                adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate any applicable
                laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, or obscure any
                proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App; (5)
                use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for which it is not
                designed or intended; (6) make the App available over a network or other environment permitting access or use by
                multiple devices or users at the same time; (7) use the App for creating a product, service, or software that is,
                directly or indirectly, competitive with or in any way a substitute for the App; (8) use the App to send automated
                queries to any website or to send any unsolicited commercial email; or (9) use any proprietary information or any
                of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or
                distribution of any applications, accessories, or devices for use with the App.
              </Text>
              <Text textAlign="justify">
                <Text marginY={2}>Apple and Android Devices</Text>
                The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an "App
                Distributor") to access the Services: (1) the license granted to you for our App is limited to a non-transferable
                license to use the application on a device that utilizes the Apple iOS or Android operating systems, as
                applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service;
                (2) we are responsible for providing any maintenance and support services with respect to the App as specified in
                the terms and conditions of this mobile application license contained in these Legal Terms or as otherwise
                required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to
                furnish any maintenance and support services with respect to the App; (3) in the event of any failure of the App
                to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in
                accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to the
                maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever
                with respect to the App; (4) you represent and warrant that (i) you are not located in a country that is subject
                to a US government embargo, or that has been designated by the US government as a "terrorist supporting" country
                and (ii) you are not listed on any US government list of prohibited or restricted parties; (5) you must comply
                with applicable third-party terms of agreement when using the App, e.g., if you have a VoIP application, then you
                must not be in violation of their wireless data service agreement when using the App; and (6) you acknowledge and
                agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile
                application license contained in these Legal Terms, and that each App Distributor will have the right (and will be
                deemed to have accepted the right) to enforce the terms and conditions in this mobile application license
                contained in these Legal Terms against you as a third-party beneficiary thereof.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                9. SOCIAL MEDIA
              </Text>
              <Text textAlign="justify">
                As part of the functionality of the Services, you may link your account with online accounts you have with
                third-party service providers (each such account, a "Third-Party Account") by either: (1) providing your
                Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party Account,
                as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account. You
                represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or
                grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern
                your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to
                any usage limitations imposed by the third-party service provider of the Third-Party Account. By granting us
                access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if
                applicable) any content that you have provided to and stored in your Third-Party Account (the "Social Network
                Content") so that it is available on and through the Services via your account, including without limitation any
                friend lists and (2) we may submit to and receive from your Third-Party Account additional information to the
                extent you are notified when you link your account with the Third-Party Account. Depending on the Third-Party
                Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally
                identifiable information that you post to your Third-Party Accounts may be available on and through your account
                on the Services. Please note that if a Third-Party Account or associated service becomes unavailable or our access
                to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no
                longer be available on and through the Services. You will have the ability to disable the connection between your
                account on the Services and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
                THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S)
                WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content for any purpose,
                including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any
                Social Network Content. You acknowledge and agree that we may access your email address book associated with a
                Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of
                identifying and informing you of those contacts who have also registered to use the Services. You can deactivate
                the connection between the Services and your Third-Party Account by contacting us using the contact information
                below or through your account settings (if applicable). We will attempt to delete any information stored on our
                servers that was obtained through such Third-Party Account, except the username and profile picture that become
                associated with your account.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                10. THIRD-PARTY WEBSITES AND CONTENT
              </Text>
              <Text textAlign="justify">
                The Services may contain (or you may be sent via the App) links to other websites ("Third-Party Websites") as well
                as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications,
                software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such
                Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy,
                appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through
                the Services or any Third-Party Content posted on, available through, or installed from the Services, including
                the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained
                in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or
                installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof
                by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any
                Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You
                should review the applicable terms and policies, including privacy and data gathering practices, of any website to
                which you navigate from the Services or relating to any applications you use or install from the Services. Any
                purchases you make through Third-Party Websites will be through other websites and from other companies, and we
                take no responsibility whatsoever in relation to such purchases which are exclusively between you and the
                applicable third party. You agree and acknowledge that we do not endorse the products or services offered on
                Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or
                services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you
                relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                11. ADVERTISERS
              </Text>
              <Text textAlign="justify">
                We allow advertisers to display their advertisements and other information in certain areas of the Services, such
                as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and
                we have no other relationship with advertisers.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                12. SERVICES MANAGEMENT
              </Text>
              <Text textAlign="justify">
                We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms;
                (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal
                Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole
                discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the
                extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and
                without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content
                that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a
                manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                13. PRIVACY POLICY{" "}
              </Text>
              <Text textAlign="justify">
                We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted
                on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in
                Belgium. If you access the Services from any other region of the world with laws or other requirements governing
                personal data collection, use, or disclosure that differ from applicable laws in Belgium, then through your
                continued use of the Services, you are transferring your data to Belgium, and you expressly consent to have your
                data transferred to and processed in Belgium.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                14. COPYRIGHT INFRINGEMENTS
              </Text>
              <Text textAlign="justify">
                We respect the intellectual property rights of others. If you believe that any material available on or through
                the Services infringes upon any copyright you own or control, please immediately notify us using the contact
                information provided below (a "Notification"). A copy of your Notification will be sent to the person who posted
                or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be
                held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that
                material located on or linked to by the Services infringes your copyright, you should consider first contacting an
                attorney.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                15. TERM AND TERMINATION
              </Text>
              <Text textAlign="justify">
                These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER
                PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY,
                DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR
                FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
                THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE
                SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN
                OUR SOLE DISCRETION. If we terminate or suspend your account for any reason, you are prohibited from registering
                and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you
                may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the
                right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive
                redress.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                16. MODIFICATIONS AND INTERRUPTIONS
              </Text>
              <Text textAlign="justify">
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at
                our sole discretion without notice. However, we have no obligation to update any information on our Services. We
                will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of
                the Services. We cannot guarantee the Services will be available at all times. We may experience hardware,
                software, or other problems or need to perform maintenance related to the Services, resulting in interruptions,
                delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the
                Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for
                any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or
                discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and
                support the Services or to supply any corrections, updates, or releases in connection therewith.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                17. GOVERNING LAW
              </Text>
              <Text textAlign="justify">
                These Legal Terms are governed by and interpreted following the laws of Belgium, and the use of the United Nations
                Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is
                in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory
                provisions of the law in your country to residence. Vinnie Schelfhaut and yourself both agree to submit to the
                non-exclusive jurisdiction of the courts of __________, which means that you may make a claim to defend your
                consumer protection rights in regards to these Legal Terms in Belgium, or in the EU country in which you reside.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                18. DISPUTE RESOLUTION
              </Text>
              <Text textAlign="justify">
                Informal Negotiations To expedite resolution and control the cost of any dispute, controversy, or claim related to
                these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a
                "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except
                those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration.
                Such informal negotiations commence upon written notice from one Party to the other Party. Binding Arbitration Any
                dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one
                arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of
                Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force
                at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance.
                The seat of arbitration shall be Belgium. The language of the proceedings shall be __________. Applicable rules of
                substantive law shall be the law of Belgium. Restrictions The Parties agree that any arbitration shall be limited
                to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be
                joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a
                class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute
                to be brought in a purported representative capacity on behalf of the general public or any other persons.
                Exceptions to Informal Negotiations and Arbitration The Parties agree that the following Disputes are not subject
                to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce
                or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute
                related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any
                claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will
                elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable
                and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction
                above, and the Parties agree to submit to the personal jurisdiction of that court.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                19. CORRECTIONS
              </Text>
              <Text textAlign="justify">
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including
                descriptions, pricing, availability, and various other information. We reserve the right to correct any errors,
                inaccuracies, or omissions and to change or update the information on the Services at any time, without prior
                notice.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                20. DISCLAIMER
              </Text>
              <Text textAlign="justify">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT
                YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN
                CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
                ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS
                LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
                INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING
                FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR
                ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED
                TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR
                FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR
                OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY
                PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
                WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY
                WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
                SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE
                YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                21. LIMITATIONS OF LIABILITY
              </Text>
              <Text textAlign="justify">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE,
                LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR
                ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF
                ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR
                THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS
                OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                22. INDEMNIFICATION
              </Text>
              <Text textAlign="justify">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
                respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or
                demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1)
                your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your
                representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party,
                including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of
                the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at
                your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify
                us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts
                to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming
                aware of it.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                23. USER DATA
              </Text>
              <Text textAlign="justify">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the
                Services, as well as data relating to your use of the Services. Although we perform regular routine backups of
                data, you are solely responsible for all data that you transmit or that relates to any activity you have
                undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any
                such data, and you hereby waive any right of action against us arising from any such loss or corruption of such
                data.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                24. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
              </Text>
              <Text textAlign="justify">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You
                consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other
                communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that
                such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND
                OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED
                BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules,
                ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of
                non-electronic records, or to payments or the granting of credits by any means other than electronic means.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                25. CALIFORNIA USERS AND RESIDENTS
              </Text>
              <Text textAlign="justify">
                If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the
                Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market
                Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                26. MISCELLANEOUS
              </Text>
              <Text textAlign="justify">
                These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services
                constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right
                or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms
                operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others
                at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any
                cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to
                be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal
                Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture,
                partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use
                of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted
                them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the
                lack of signing by the parties hereto to execute these Legal Terms.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                27. CONTACT US
              </Text>
              <Text textAlign="justify">
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the
                Services, please contact us at: Vinnie Schelfhaut __________ vinnieschelfhaut@gmail.com These terms of use were
                created using Termly's Terms and Conditions Generator.
              </Text>
              <Text fontWeight="bold" marginY={4}>
                PRIVACY CONTINUED
              </Text>
              <Text fontWeight="bold" marginY={2}>
                1. WHAT INFORMATION DO WE COLLECT?
              </Text>
              <Text textAlign="justify">
                In Short: We collect personal information that you provide to us. We collect personal information that you
                voluntarily provide to us when you register on the Services, express an interest in obtaining information about us
                or our products and Services, when you participate in activities on the Services, or otherwise when you contact
                us. Personal Information Provided by You. The personal information that we collect depends on the context of your
                interactions with us and the Services, the choices you make, and the products and features you use. The personal
                information we collect may include the following: email addresses usernames passwords Sensitive Information. We do
                not process sensitive information. Social Media Login Data. We may provide you with the option to register with us
                using your existing social media account details, like your Facebook, Twitter, or other social media account. If
                you choose to register in this way, we will collect the information described in the section called "HOW DO WE
                HANDLE YOUR SOCIAL LOGINS?" below. Application Data. If you use our application(s), we also may collect the
                following information if you choose to provide us with access or permission: Mobile Device Data. We automatically
                collect device information (such as your mobile device ID, model, and manufacturer), operating system, version
                information and system configuration information, device and application identification numbers, browser type and
                version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or
                proxy server). If you are using our application(s), we may also collect information about the phone network
                associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device
                you use, your mobile device’s unique device ID, and information about the features of our application(s) you
                accessed. Push Notifications. We may request to send you push notifications regarding your account or certain
                features of the application(s). If you wish to opt out from receiving these types of communications, you may turn
                them off in your device's settings. This information is primarily needed to maintain the security and operation of
                our application(s), for troubleshooting, and for our internal analytics and reporting purposes. All personal
                information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to
                such personal information.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                2. HOW DO WE PROCESS YOUR INFORMATION?
              </Text>
              <Text textAlign="justify">
                In Short: We process your information to provide, improve, and administer our Services, communicate with you, for
                security and fraud prevention, and to comply with law. We may also process your information for other purposes
                with your consent. We process your personal information for a variety of reasons, depending on how you interact
                with our Services, including: To facilitate account creation and authentication and otherwise manage user
                accounts. We may process your information so you can create and log in to your account, as well as keep your
                account in working order. To save or protect an individual's vital interest. We may process your information when
                necessary to save or protect an individual’s vital interest, such as to prevent harm.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
              </Text>
              <Text textAlign="justify">
                In Short: We only process your personal information when we believe it is necessary and we have a valid legal
                reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide
                you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our
                legitimate business interests. If you are located in the EU or UK, this section applies to you. The General Data
                Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to
                process your personal information. As such, we may rely on the following legal bases to process your personal
                information: Consent. We may process your information if you have given us permission (i.e., consent) to use your
                personal information for a specific purpose. You can withdraw your consent at any time. Learn more about
                withdrawing your consent. Legal Obligations. We may process your information where we believe it is necessary for
                compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency,
                exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are
                involved. Vital Interests. We may process your information where we believe it is necessary to protect your vital
                interests or the vital interests of a third party, such as situations involving potential threats to the safety of
                any person. If you are located in Canada, this section applies to you. We may process your information if you have
                given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or
                in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any
                time. In some exceptional cases, we may be legally permitted under applicable law to process your information
                without your consent, including, for example: If collection is clearly in the interests of an individual and
                consent cannot be obtained in a timely way For investigations and fraud detection and prevention For business
                transactions provided certain conditions are met If it is contained in a witness statement and the collection is
                necessary to assess, process, or settle an insurance claim For identifying injured, ill, or deceased persons and
                communicating with next of kin If we have reasonable grounds to believe an individual has been, is, or may be
                victim of financial abuse If it is reasonable to expect collection and use with consent would compromise the
                availability or the accuracy of the information and the collection is reasonable for purposes related to
                investigating a breach of an agreement or a contravention of the laws of Canada or a province If disclosure is
                required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of
                records If it was produced by an individual in the course of their employment, business, or profession and the
                collection is consistent with the purposes for which the information was produced If the collection is solely for
                journalistic, artistic, or literary purposes If the information is publicly available and is specified by the
                regulations
              </Text>
              <Text fontWeight="bold" marginY={2}>
                4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </Text>
              <Text textAlign="justify">
                In Short: We may share information in specific situations described in this section and/or with the following
                third parties. We may need to share your personal information in the following situations: Business Transfers. We
                may share or transfer your information in connection with, or during negotiations of, any merger, sale of company
                assets, financing, or acquisition of all or a portion of our business to another company.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
              </Text>
              <Text textAlign="justify">
                In Short: We are not responsible for the safety of any information that you share with third parties that we may
                link to or who advertise on our Services, but are not affiliated with, our Services. The Services may link to
                third-party websites, online services, or mobile applications and/or contain advertisements from third parties
                that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we
                do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage
                caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a
                third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety
                and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this
                privacy notice. We are not responsible for the content or privacy and security practices and policies of any third
                parties, including other websites, services, or applications that may be linked to or from the Services. You
                should review the policies of such third parties and contact them directly to respond to your questions.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              </Text>
              <Text textAlign="justify">
                In Short: If you choose to register or log in to our Services using a social media account, we may have access to
                certain information about you. Our Services offer you the ability to register and log in using your third-party
                social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive
                certain profile information about you from your social media provider. The profile information we receive may vary
                depending on the social media provider concerned, but will often include your name, email address, friends list,
                and profile picture, as well as other information you choose to make public on such a social media platform. We
                will use the information we receive only for the purposes that are described in this privacy notice or that are
                otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible
                for, other uses of your personal information by your third-party social media provider. We recommend that you
                review their privacy notice to understand how they collect, use, and share your personal information, and how you
                can set your privacy preferences on their sites and apps.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                7. HOW LONG DO WE KEEP YOUR INFORMATION?
              </Text>
              <Text textAlign="justify">
                In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy
                notice unless otherwise required by law. We will only keep your personal information for as long as it is
                necessary for the purposes set out in this privacy notice, unless a longer retention period is required or
                permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us
                keeping your personal information for longer than the period of time in which users have an account with us. When
                we have no ongoing legitimate business need to process your personal information, we will either delete or
                anonymize such information, or, if this is not possible (for example, because your personal information has been
                stored in backup archives), then we will securely store your personal information and isolate it from any further
                processing until deletion is possible
              </Text>
              <Text fontWeight="bold" marginY={2}>
                8. HOW DO WE KEEP YOUR INFORMATION SAFE?
              </Text>
              <Text textAlign="justify">
                In Short: We aim to protect your personal information through a system of organizational and technical security
                measures. We have implemented appropriate and reasonable technical and organizational security measures designed
                to protect the security of any personal information we process. However, despite our safeguards and efforts to
                secure your information, no electronic transmission over the Internet or information storage technology can be
                guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
                unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or
                modify your information. Although we will do our best to protect your personal information, transmission of
                personal information to and from our Services is at your own risk. You should only access the Services within a
                secure environment.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                9. WHAT ARE YOUR PRIVACY RIGHTS?
              </Text>
              <Text textAlign="justify">
                n Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada,
                you have rights that allow you greater access to and control over your personal information. You may review,
                change, or terminate your account at any time. In some regions (like the EEA, UK, Switzerland, and Canada), you
                have certain rights under applicable data protection laws. These may include the right (i) to request access and
                obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the
                processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to
                automated decision-making. In certain circumstances, you may also have the right to object to the processing of
                your personal information. You can make such a request by contacting us by using the contact details provided in
                the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. We will consider and act upon any request in
                accordance with applicable data protection laws. If you are located in the EEA or UK and you believe we are
                unlawfully processing your personal information, you also have the right to complain to your Member State data
                protection authority or UK data protection authority. If you are located in Switzerland, you may contact the
                Federal Data Protection and Information Commissioner. Withdrawing your consent: If we are relying on your consent
                to process your personal information, which may be express and/or implied consent depending on the applicable law,
                you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting
                us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
                However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when
                applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful
                processing grounds other than consent. Account Information If you would at any time like to review or change the
                information in your account or terminate your account, you can: Contact us using the contact information provided.
                Upon your request to terminate your account, we will deactivate or delete your account and information from our
                active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems,
                assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                10. CONTROLS FOR DO-NOT-TRACK FEATURES
              </Text>
              <Text textAlign="justify">
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature
                or setting you can activate to signal your privacy preference not to have data about your online browsing
                activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing
                DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism
                that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted
                that we must follow in the future, we will inform you about that practice in a revised version of this privacy
                notice.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
              </Text>
              <Text textAlign="justify">
                In Short: If you are a resident of California, Colorado, Connecticut, Utah or Virginia, you are granted specific
                rights regarding access to your personal information. What categories of personal information do we collect? We
                have collected the following categories of personal information in the past twelve (12) months: Category Examples
                Collected A. Identifiers Contact details, such as real name, alias, postal address, telephone or mobile contact
                number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name
                YES B. Personal information as defined in the California Customer Records statute Name, contact information,
                education, employment, employment history, and financial information NO C. Protected classification
                characteristics under state or federal law Gender and date of birth NO D. Commercial information Transaction
                information, purchase history, financial details, and payment information NO E. Biometric information Fingerprints
                and voiceprints NO F. Internet or other similar network activity Browsing history, search history, online
                behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements
                NO G. Geolocation data Device location NO H. Audio, electronic, visual, thermal, olfactory, or similar information
                Images and audio, video or call recordings created in connection with our business activities NO I. Professional
                or employment-related information Business contact details in order to provide you our Services at a business
                level or job title, work history, and professional qualifications if you apply for a job with us NO J. Education
                Information Student records and directory information NO K. Inferences drawn from collected personal information
                Inferences drawn from any of the collected personal information listed above to create a profile or summary about,
                for example, an individual’s preferences and characteristics NO L. Sensitive personal Information NO We will use
                and retain the collected personal information as needed to provide the Services or for: Category A - As long as
                the user has an account with us We may also collect other personal information outside of these categories through
                instances where you interact with us in person, online, or by phone or mail in the context of: Receiving help
                through our customer support channels; Participation in customer surveys or contests; and Facilitation in the
                delivery of our Services and to respond to your inquiries. How do we use and share your personal information?
                Learn about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?" Will your
                information be shared with anyone else? We may disclose your personal information with our service providers
                pursuant to a written contract between us and each service provider. Learn more about how we disclose personal
                information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?" We may use your
                personal information for our own business purposes, such as for undertaking internal research for technological
                development and demonstration. This is not considered to be "selling" of your personal information. We have not
                disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the
                preceding twelve (12) months. We will not sell or share personal information in the future belonging to website
                visitors, users, and other consumers. California Residents California Civil Code Section 1798.83, also known as
                the "Shine The Light" law permits our users who are California residents to request and obtain from us, once a
                year and free of charge, information about categories of personal information (if any) we disclosed to third
                parties for direct marketing purposes and the names and addresses of all third parties with which we shared
                personal information in the immediately preceding calendar year. If you are a California resident and would like
                to make such a request, please submit your request in writing to us using the contact information provided below.
                If you are under 18 years of age, reside in California, and have a registered account with the Services, you have
                the right to request removal of unwanted data that you publicly post on the Services. To request removal of such
                data, please contact us using the contact information provided below and include the email address associated with
                your account and a statement that you reside in California. We will make sure the data is not publicly displayed
                on the Services, but please be aware that the data may not be completely or comprehensively removed from all our
                systems (e.g., backups, etc.). CCPA Privacy Notice This section applies only to California residents. Under the
                California Consumer Privacy Act (CCPA), you have the rights listed below. The California Code of Regulations
                defines a "residents" as: (1) every individual who is in the State of California for other than a temporary or
                transitory purpose and (2) every individual who is domiciled in the State of California who is outside the State
                of California for a temporary or transitory purpose All other individuals are defined as "non-residents." If this
                definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal
                information. Your rights with respect to your personal data Right to request deletion of the data — Request to
                delete You can ask for the deletion of your personal information. If you ask us to delete your personal
                information, we will respect your request and delete your personal information, subject to certain exceptions
                provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech,
                our compliance requirements resulting from a legal obligation, or any processing that may be required to protect
                against illegal activities. Right to be informed — Request to know Depending on the circumstances, you have a
                right to know: whether we collect and use your personal information; the categories of personal information that
                we collect; the purposes for which the collected personal information is used; whether we sell or share personal
                information to third parties; the categories of personal information that we sold, shared, or disclosed for a
                business purpose; the categories of third parties to whom the personal information was sold, shared, or disclosed
                for a business purpose; the business or commercial purpose for collecting, selling, or sharing personal
                information; and the specific pieces of personal information we collected about you. In accordance with applicable
                law, we are not obligated to provide or delete consumer information that is de-identified in response to a
                consumer request or to re-identify individual data to verify a consumer request. Right to Non-Discrimination for
                the Exercise of a Consumer’s Privacy Rights We will not discriminate against you if you exercise your privacy
                rights. Right to Limit Use and Disclosure of Sensitive Personal Information We do not process consumer's sensitive
                personal information. Verification process Upon receiving your request, we will need to verify your identity to
                determine you are the same person about whom we have the information in our system. These verification efforts
                require us to ask you to provide information so that we can match it with information you have previously provided
                us. For instance, depending on the type of request you submit, we may ask you to provide certain information so
                that we can match the information you provide with the information we already have on file, or we may contact you
                through a communication method (e.g., phone or email) that you have previously provided to us. We may also use
                other verification methods as the circumstances dictate. We will only use personal information provided in your
                request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting
                additional information from you for the purposes of verification. However, if we cannot verify your identity from
                the information already maintained by us, we may request that you provide additional information for the purposes
                of verifying your identity and for security or fraud-prevention purposes. We will delete such additionally
                provided information as soon as we finish verifying you. Other privacy rights You may object to the processing of
                your personal information. You may request correction of your personal data if it is incorrect or no longer
                relevant, or ask to restrict the processing of the information. You can designate an authorized agent to make a
                request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof
                that they have been validly authorized to act on your behalf in accordance with the CCPA. You may request to opt
                out from future selling or sharing of your personal information to third parties. Upon receiving an opt-out
                request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the
                date of the request submission. To exercise these rights, you can contact us by submitting a data subject access
                request, by email at vinnieschelfhaut@gmail.com, or by referring to the contact details at the bottom of this
                document. If you have a complaint about how we handle your data, we would like to hear from you. Colorado
                Residents This section applies only to Colorado residents. Under the Colorado Privacy Act (CPA), you have the
                rights listed below. However, these rights are not absolute, and in certain cases, we may decline your request as
                permitted by law. Right to be informed whether or not we are processing your personal data Right to access your
                personal data Right to correct inaccuracies in your personal data Right to request deletion of your personal data
                Right to obtain a copy of the personal data you previously shared with us Right to opt out of the processing of
                your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance
                of decisions that produce legal or similarly significant effects ("profiling") To submit a request to exercise
                these rights described above, please submit a data subject access request. If we decline to take action regarding
                your request and you wish to appeal our decision, please email us at __________. Within forty-five (45) days of
                receipt of an appeal, we will inform you in writing of any action taken or not taken in response to the appeal,
                including a written explanation of the reasons for the decisions. Connecticut Residents This section applies only
                to Connecticut residents. Under the Connecticut Data Privacy Act (CTDPA), you have the rights listed below.
                However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law.
                Right to be informed whether or not we are processing your personal data Right to access your personal data Right
                to correct inaccuracies in your personal data Right to request deletion of your personal data Right to obtain a
                copy of the personal data you previously shared with us Right to opt out of the processing of your personal data
                if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that
                produce legal or similarly significant effects ("profiling") To submit a request to exercise these rights
                described above, please submit a data subject access request. If we decline to take action regarding your request
                and you wish to appeal our decision, please email us at __________. Within sixty (60) days of receipt of an
                appeal, we will inform you in writing of any action taken or not taken in response to the appeal, including a
                written explanation of the reasons for the decisions. Utah Residents This section applies only to Utah residents.
                Under the Utah Consumer Privacy Act (UCPA), you have the rights listed below. However, these rights are not
                absolute, and in certain cases, we may decline your request as permitted by law. Right to be informed whether or
                not we are processing your personal data Right to access your personal data Right to request deletion of your
                personal data Right to obtain a copy of the personal data you previously shared with us Right to opt out of the
                processing of your personal data if it is used for targeted advertising or the sale of personal data To submit a
                request to exercise these rights described above, please submit a data subject access request. Virginia Residents
                Under the Virginia Consumer Data Protection Act (VCDPA): "Consumer" means a natural person who is a resident of
                the Commonwealth acting only in an individual or household context. It does not include a natural person acting in
                a commercial or employment context. "Personal data" means any information that is linked or reasonably linkable to
                an identified or identifiable natural person. "Personal data" does not include de-identified data or publicly
                available information. "Sale of personal data" means the exchange of personal data for monetary consideration. If
                this definition of "consumer" applies to you, we must adhere to certain rights and obligations regarding your
                personal data. Your rights with respect to your personal data Right to be informed whether or not we are
                processing your personal data Right to access your personal data Right to correct inaccuracies in your personal
                data Right to request deletion of your personal data Right to obtain a copy of the personal data you previously
                shared with us Right to opt out of the processing of your personal data if it is used for targeted advertising,
                the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant
                effects ("profiling") Exercise your rights provided under the Virginia VCDPA You may submit a data subject access
                request. If you are using an authorized agent to exercise your rights, we may deny a request if the authorized
                agent does not submit proof that they have been validly authorized to act on your behalf. Verification process We
                may request that you provide additional information reasonably necessary to verify you and your consumer's
                request. If you submit the request through an authorized agent, we may need to collect additional information to
                verify your identity before processing your request. Upon receiving your request, we will respond without undue
                delay, but in all cases, within forty-five (45) days of receipt. The response period may be extended once by
                forty-five (45) additional days when reasonably necessary. We will inform you of any such extension within the
                initial 45-day response period, together with the reason for the extension. Right to appeal If we decline to take
                action regarding your request, we will inform you of our decision and reasoning behind it. If you wish to appeal
                our decision, please email us at __________. Within sixty (60) days of receipt of an appeal, we will inform you in
                writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons
                for the decisions. If your appeal is denied, you may contact the Attorney General to submit a complaint.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
              </Text>
              <Text textAlign="justify">
                In Short: You may have additional rights based on the country you reside in. Australia We collect and process your
                personal information under the obligations and conditions set by Australia's Privacy Act 1988 (Privacy Act). This
                privacy notice satisfies the notice requirements defined in the Privacy Act, in particular: what personal
                information we collect from you, from which sources, for which purposes, and other recipients of your personal
                information. If you do not wish to provide the personal information necessary to fulfill their applicable purpose,
                it may affect our ability to provide our services, in particular: offer you the products or services that you want
                respond to or help with your requests manage your account with us confirm your identity and protect your account
                At any time, you have the right to request access to or correction of your personal information. You can make such
                a request by contacting us by using the contact details provided in the section "HOW CAN YOU REVIEW, UPDATE, OR
                DELETE THE DATA WE COLLECT FROM YOU?" If you believe we are unlawfully processing your personal information, you
                have the right to submit a complaint about a breach of the Australian Privacy Principles to the Office of the
                Australian Information Commissioner.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                13. DO WE MAKE UPDATES TO THIS NOTICE?
              </Text>
              <Text textAlign="justify">
                In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws. We may update this
                privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the
                updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice,
                we may notify you either by prominently posting a notice of such changes or by directly sending you a
                notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting
                your information.
              </Text>
              <Text fontWeight="bold" marginY={2}>
                14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </Text>
              <Text textAlign="justify">
                If you have questions or comments about this notice, you may email us at vinnieschelfhaut@gmail.com or contact us
                by post at: Vinnie Schelfhaut
              </Text>
              <Text fontWeight="bold" marginY={2}>
                15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
              </Text>
              <Text textAlign="justify">
                You have the right to request access to the personal information we collect from you, change that information, or
                delete it. To request to review, update, or delete your personal information, please fill out and submit a data
                subject access request. This privacy policy was created using Termly's Privacy Policy Generator.
              </Text>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
