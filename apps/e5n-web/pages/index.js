import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  useToast,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import SupvizComp from "../components/supviz";
import HostComp from "../components/host";
import StaffComp from "../components/staff";
import PressComp from "../components/press";
import MediaComp from "../components/media";
import SponsorComp from "../components/sponsor";
import SocMedComp from "../components/socmed";
import CreativeComp from "../components/creative";

import BGOverlay from "../components/bg-overlay";
import Link from "next/link";

function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isGetDataRun, setIsGetDataRun] = useState(false);

  const [Supviz, setSupviz] = useState(false);
  const [Host, setHost] = useState(false);
  const [Staff, setStaff] = useState(false);
  const [Press, setPress] = useState(false);
  const [Media, setMedia] = useState(false);
  const [Creative, setCreative] = useState(false);
  const [Sponsor, setSponsor] = useState(false);
  const [SocMed, setSocMed] = useState(false);

  const [ModalTitle, setModalTitle] = useState("");
  const [ModalBodyText, setModalBodyText] = useState("");
  const [ModalPassword, setModalPassword] = useState("");
  const [ModalType, setModalType] = useState("");

  const [ModalPasswordInput, setModalPasswordInput] = useState("");

  useEffect(() => {
    if (!isGetDataRun) {
      return;
    }
    const pecsetek = {
      supviz: Supviz,
      host: Host,
      staff: Staff,
      press: Press,
      media: Media,
      creative: Creative,
      sponsor: Sponsor,
      socmed: SocMed,
    };
    localStorage.setItem("pecsetek", JSON.stringify(pecsetek));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Supviz, Host, Staff, Press, Media, Creative, Sponsor, SocMed]);

  useEffect(() => {
    const pecsetek = JSON.parse(localStorage.getItem("pecsetek"));
    if (pecsetek) {
      setSupviz(pecsetek.supviz);
      setHost(pecsetek.host);
      setStaff(pecsetek.staff);
      setPress(pecsetek.press);
      setMedia(pecsetek.media);
      setCreative(pecsetek.creative);
      setSponsor(pecsetek.sponsor);
      setSocMed(pecsetek.socmed);
    }
    setIsGetDataRun(true);
  }, []);

  function closeModal() {
    onClose();
    setModalTitle("");
    setModalBodyText("");
    setModalPassword("");
    setModalType("");
    setModalPasswordInput("");
  }

  function checkPassword() {
    axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/upload", {
      pecset: ModalType,
      megadottJelszo: ModalPasswordInput,
      helyesJelszo: ModalPassword,
      ervenyes: ModalPassword === ModalPasswordInput,
    });

    if (ModalPasswordInput === ModalPassword) {
      switch (ModalType) {
        case "kavezo":
          setSupviz(false);
          setHost(false);
          setStaff(false);
          setPress(false);
          setMedia(false);
          setCreative(false);
          setSponsor(false);
          setSocMed(false);
          break;
        case "supviz":
          setSupviz(!Supviz);
          break;
        case "host":
          setHost(!Host);
          break;
        case "staff":
          setStaff(!Staff);
          break;
        case "press":
          setPress(!Press);
          break;
        case "media":
          setMedia(!Media);
          break;
        case "creative":
          setCreative(!Creative);
          break;
        case "sponsor":
          setSponsor(!Sponsor);
          break;
        case "socmed":
          setSocMed(!SocMed);
          break;
      }

      switch (ModalType) {
        case "kavezo":
          toast({
            title: "Helyes k??v??z??jelsz??",
            description: "Reml??j??k, hogy j??l ??rezted magad n??lunk!",
            status: "success",
            duration: 10000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: "Helyes standjelsz??.",
            description: "Megkaptad a pecs??tet. Gratul??lok!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          break;
      }
      closeModal();
    } else {
      toast({
        title: "Helytelen standjelsz??!",
        description: "K??rlek pr??b??ld ??jra.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setModalPasswordInput("");
    }
  }

  function openModal(stand) {
    switch (stand) {
      case "kavezo":
        setModalTitle("K??v??z??");
        setModalBodyText(
          "Sikeresen megszerezted az ??sszes pecs??tet! Menj a k??v??z??ba ??s mutasd be nek??nk a pecs??teket, hogy megkapd a jutalmadat!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_KAVEZO_PASS);
        setModalType("kavezo");
        onOpen();
        break;
      case "supviz":
        setModalTitle("Supervisor stand");
        setModalBodyText(
          "Szeretsz hirtelen helyzeteket megoldani? Fel tudod ismerni, mir??l k??sz??lt a k??p? Ha igen, akkor ez a stand neked val??! Pr??b??ld ki magad a Supervisor standon!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_SUPVIZ_PASS);
        setModalType("supviz");
        onOpen();
        break;
      case "staff":
        setModalTitle("Staff stand");
        setModalBodyText(
          "L??togass el a Staff standhoz ??s pr??b??ld ki, milyen egy igazi staff napja. A r??vid akad??lyp??ly??n vicces ??s v??ltozatos feladatokban lesz r??szed ??s a pecs??t is a ti??d lesz."
        );
        setModalPassword(process.env.NEXT_PUBLIC_STAFF_PASS);
        setModalType("staff");
        onOpen();
        break;
      case "host":
        setModalTitle("Host stand");
        setModalBodyText(
          "N??zd meg a Host standot ??s der??tsd ki, melyik deleg??lt illene bele legjobban a te ??letedbe. V??laszolj a k??rd??sekre ??s r??gt??n kider??l. Term??szetesen a pecs??tet is megkapod!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_HOST_PASS);
        setModalType("host");
        onOpen();
        break;
      case "press":
        setModalTitle("Press stand");
        setModalBodyText(
          "Gyertek el a Pressesekhez megismerni milyen is a sajt??ban dolgozni! Tesztelhetitek tud??sotokat az ??js??g??r??sr??l ??s t??rsasozhattok is vel??nk csapatban a bar??taitokkal vagy sz??l??ban is!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_PRESS_PASS);
        setModalType("press");
        onOpen();
        break;
      case "media":
        setModalTitle("Media stand");
        setModalBodyText(
          "Ugorj el a Media standhoz ??s tal??ld meg a hib??kat r??gi BIMUN k??peinken."
        );
        setModalPassword(process.env.NEXT_PUBLIC_MEDIA_PASS);
        setModalType("media");
        onOpen();
        break;
      case "creative":
        setModalTitle("Creative stand");
        setModalBodyText(
          "Hozzatok l??tre a bar??taiddal k??z??sen egy megnyer?? plak??tot!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_CREATIVE_PASS);
        setModalType("creative");
        onOpen();
        break;
      case "sponsor":
        setModalTitle("Sponsorship stand");
        setModalBodyText(
          "Gyere ??s gy??zz meg minket egy egy??ttm??k??d??sre! V??lassz a k??rty??kon l??v?? feladatok k??z??l ??s pr??b??ld ki magad sponsorship managerk??nt!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_SPONSOR_PASS);
        setModalType("sponsor");
        onOpen();
        break;
      case "socmed":
        setModalTitle("Social media stand");
        setModalBodyText(
          "Gyere ??s ismerkedj meg a social media oldalainkkal ??s alkosd ??jra a BIMUN legk??l??nlegesebb k??peit!"
        );
        setModalPassword(process.env.NEXT_PUBLIC_SOCMED_PASS);
        setModalType("socmed");
        onOpen();
        break;
    }
  }

  return (
    <>
      <BGOverlay />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ModalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              <strong>Le??r??s:</strong> {ModalBodyText}
            </p>
            {ModalType === "host" ? (
              <></>
            ) : (
              <input
                type="text"
                className="modal-password-input"
                placeholder="Standjelsz??"
                value={ModalPasswordInput}
                onChange={(e) => setModalPasswordInput(e.target.value)}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeModal} variant="ghost" mr={3}>
              M??gse
            </Button>
            {ModalType === "host" ? (
              <Link href="/host">
                <Button mt={2} mb={2}>
                  K??rd????v megnyit??sa
                </Button>
              </Link>
            ) : (
              <Button colorScheme="whatsapp" onClick={checkPassword}>
                Pecs??t hozz??ad??sa
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        w={"100vw"}
        h={"10vh"}
        bgGradient={"linear(to-b, rgb(20, 21, 67), rgb(23, 27, 38))"}
        justify={"center"}
        align={"center"}
      >
        <Image
          width={163 * 0.7}
          height={50 * 0.7}
          fit={"cover"}
          src={"https://www.bimun.hu/img/bimun_logo_navbar.png"}
          alt={"BIMUN Logo"}
        ></Image>
      </Flex>
      <Box width={"100vw"} bgColor={"rgb(23, 27, 38)"} color={"white"}>
        <Heading align={"center"}>E5N pecs??tgy??jt??get??s</Heading>
        {Supviz &&
        Host &&
        Staff &&
        Press &&
        Media &&
        Creative &&
        SocMed &&
        Sponsor ? (
          <Box
            align={"center"}
            bgColor="blue.900"
            margin={2}
            rounded={10}
            textColor="white"
            padding={2}
          >
            <Text>
              <strong>Megszerezted az ??sszes pecs??tet! Gratul??lok!</strong>
            </Text>
            <Text>Menj a BIMUN K??v??z??ba, hogy megkapd a jutalmadat!</Text>
            <Button
              onClick={() => openModal("kavezo")}
              colorScheme={"green"}
              mt={2}
            >
              Aj??nd??k bev??lt??sa
            </Button>
          </Box>
        ) : (
          <></>
        )}
        <Flex wrap={"wrap"} justify={"space-around"} rowGap={"6"} mt={"4"}>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("supviz");
            }}
          >
            <SupvizComp isActive={Supviz}></SupvizComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("host");
            }}
          >
            <HostComp isActive={Host}></HostComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("staff");
            }}
          >
            <StaffComp isActive={Staff}></StaffComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("press");
            }}
          >
            <PressComp isActive={Press}></PressComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("media");
            }}
          >
            <MediaComp isActive={Media}></MediaComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("creative");
            }}
          >
            <CreativeComp isActive={Creative}></CreativeComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("socmed");
            }}
          >
            <SocMedComp isActive={SocMed}></SocMedComp>
          </Box>
          <Box
            align={"center"}
            w={"40%"}
            onClick={() => {
              openModal("sponsor");
            }}
          >
            <SponsorComp isActive={Sponsor}></SponsorComp>
          </Box>
        </Flex>
      </Box>
      <Flex
        w={"100vw"}
        h={"10vh"}
        bgGradient={"linear(to-t, rgb(20, 21, 67), rgb(23, 27, 38))"}
        justify={"center"}
        align={"center"}
        color={"white"}
      >
        <Text align={"center"}>
          <strong>Minden jog fenntartva ?? 2022 BIMUN</strong>
        </Text>
      </Flex>
    </>
  );
}

export default Index;
