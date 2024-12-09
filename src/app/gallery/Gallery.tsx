"use client"; // Mark this component as a client-side component

import React, { useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import "./style.css";

// List of images from Google Drive
const images = [
  {
    src: "/services_online.jpg",
    alt: "Image Not Found",
  },
  {
    src: "/yellow.jpg",
    alt: "Image Not Found",
  },
  {
    src: "/young_innovators.jpg",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/file/d/1H6v7egI-vx5NkpY2sGgkocFS69GMbh9Y/view?usp=drive_link",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1-K-w6DBKZMqcvtABOFp5JjKh3Cfk8jA-",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1-ZThEM-KOdgPjbi_X__KmJJgTBVgqzVA",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1-i3JymnvvFBt3oa2vSQWIrI6SNmHWb2N",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1-zWRvjQ_6JnhEIVRifDaEz0CgjTFsP6D",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=10Ms12_GQSXKokQgO9MAC7h90Nd4iOFZs",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=11EwpLwync_uz9_Fgl8tOhWzJBnWUusJv",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=11V3-FyOhZbkYarKImnnBGil7wZ8Z6boS",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=12l06nFws-FFE6JjCfvJvqR32GllO15-y",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=12qb4_NKrCcCgNu4M0Wg-aqyv6LvcuFlA",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=13ajndWsIpGynZKx8etLSAKXrhwbTriBg",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=14R5bNOFmLCHyXVNPamXdlFWQuAZegEz7",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=14dSgQhXwvjmNwwV5XlfIMlMeYCFickFY",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=15DzXgMhukZ_oyzKuBc6aC8O1en7kDdj9",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=15ViHHMxdrhQxEjs7Yow2k9QWo6yoM4Sq",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=169RaWh2UAKkGX-JTFlGuv8pprjTuIgPG",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=169rh8FLovMJdSdpwa0v53TRIIVqrY6m8",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=17W_sRkgANmDeqmvD-iDIakMYCq9zAZq-",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=17phT5vb9Iruas-8fG9M9zk0azeNEcNXE",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=18ELcah4oivUaysMyhFFLdsFAyIVnXi7v",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=19ViKuOxXxYApthBDiObv9F-8YtH41mTx",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=19rOFLpa6OClGGq5PjiyWmLQb8Q4ORwP3",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1AN6ljFnypmINtZT_hCoYewK8LO91h0dA",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1A_TQT0ovfbdbrh3I7na4aMH5F9FpDGKM",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Am5HhbX8bGwcy7u3nDLFK0BjKu-F9NkK",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Aqw185Td25R13zIet8DcN6cyK-A-76s1",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1AyvMB_cFfrbr04Glw1hhL0Pzelahmjdx",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Bwa5hA4GW7GxxJW-3hQkwOZMZKgMNzd1",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1C3xIWUZYpGh62y5YZv5YNwNSDTYiluvq",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1CSYCcUi0Y8qP-IaXotEX4cmUPMfceoXZ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1DOHUbHCCvIX8KxEMSyrihPJ-x_05_WAa",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1DfSd2DI5nUG2ekmEqCFIoNvMu3EwxBSj",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1F1bxil-NKgwLip61Iz6A0L89y-FIYAps",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1FaMSTjHxUUBPl1A9d8LJvYqORbdhbDIP",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1G-809K-McWl-txEIw_bqT0ijHiCGP058",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1G72OTYh6HX2kxBamwtWejc4R6m21qnpS",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1GCybf8Gx22Eu7DakXqFxdxI8uAsxUJ-2",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1GIkUbKdqCw7xS5YPsHAWvO0ZKiNPfHqU",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1GO1jG05h0Uu2WR8nxRdesvUq5P6L9nke",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1GSwvjjcq4taEdj42kVMbxxM-7CBt6HE7",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Gf8xpmrmyVqi_bPHHvHSNzrUYv9uffv8",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1H6v7egI-vx5NkpY2sGgkocFS69GMbh9Y",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1HhO5zXYd99fQKojj31wHKGy2b_dnX5S0",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1I2rmMkHiVgUXuPnMhXKUVg8DfrlaZCXU",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1IFV3jZRNzHiGfkdQhqtdFoK66ipVymdy",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1IIlRGdioIntYbKy65MHN_z1jl1LgC0wS",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ISWMcPiZxCdWdiv6fL8_1UMiO3lrXMPe",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1IZJTuoU5Nl7KgWeUdzbXlRdsp5mlTphV",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1JUc4J6jCcSEYjgTWuKiNhJex-ltl_CqQ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1JeglCyYjzcn7lBdhONPuPfORyjQcr734",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1JepAS4l91s45fiC69MP27dVkIYgrdRWf",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1L6ZXVURflQGqifCbiSamZBqNGSJLHtKY",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1M9-VfaU-kuF4MMp8YUh7TZJBnmudBEao",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1O1bpA__J5KCX1tzGFpG2LFJeYJufilM_",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1PAoD-tVKv-s1e2h7rcwNeP1Z4l7kV6Bi",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1PFKsutD4c1fWrqYPlfxkEn-cCyvu5bp2",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1PHB2PeXYa6MqNjWV5jbBWA4OZPAQ8VXh",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1PUKk0_dIwfAw3HtCkaRpS5vpzUo18037",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1PiB253INUmxoG-d5z7t70jVMUMGzxZCt",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Pq69e2Bs0_Ou751RSiQUdotHuORJvfw5",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1R4eCT2Den_ikOQVcaNOOlnrdAYv21DN_",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1RjvkX9C5ej52sgxqmRsAHgL09NSI0Yro",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1RuC1xXL9oAZ1ZC8xTXgsEix7YGHFinN5",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1SBaEWKWmS2I02Bdm79y1UPxbVsFpC2zK",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1SCF7kZwYeEdMup2a9jiZPwPoaRoSzigu",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Sfmy7_duXzL2D5cCbpXrVlXAIzONVl6Y",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1SgACKJX-sCi76mgtqvdEypK68C9ztL0J",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1SuXicmQGZ-oFGzRyjCkAgSu2Cisj5Z7X",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1U7Pvmv0tWQ0wcXj6iJZ910Z5MGEJDdJ8",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1UH3TF2H7JmY4FYBWF3-CUfw_ipkZrHgZ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1UI1oP8nUM1AQ_gGtfh5h57uOcz4XDRuJ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1UWuGMHGGc4jq2YQ9l5EbRJrxQ8bPhXe_",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1V4Dy4pM423rPn5uItEs172RYgG8B29sh",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1VD9dgbueLVFRfRjk8pVC6xkbasqVwlww",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1VNTqB_J5HXozF9uKUcCWyxcN8WceEN1_",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1VVGdX8RuOPwhu6pLtXWaZE7wcJPAt37s",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1W_Lq0vSFbklb7z75_3BSxoRS1zhUEEjL",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Wssa0XnjX0DXjXdupTHPisnqjCaWn6t1",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1X1UDwISs1D4TS1_-eBn4buVZkpDr3scW",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1XW0xOuTOp1-WlfIVNv1giSzdwlzZCNMs",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1YO7NVJg7A8XkuDmQnDzpV2k44yumecce",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1YrUpfev-5sAJg6KLY9ifiXB-6_G9Th4E",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Z_G5CbikdRZLAQSF5f4JkyRLkZZwN94i",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1Zoy87fY0V47SCsAZEzFEhiyS0f-TK94y",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1_OQwNl228bHM8SS-Tt-liWt_j8Aob0_4",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1aJ5Xu0xIrCjpNzIZL0pQeCpn9a_5x0aE",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1aiqPz7wDsXKcWyrmiVfmTZSJ33NdPQ_w",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1awkTedSjwcIbak13_UfrLdQoYdt3F4Po",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1bakjqYIhC4uCrPqtWQYI8QoCz6Sj9-0y",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1bbPZZqXzTxUBeAKztZwgBhcWJ4BjPHTR",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1cK6j-M0z_l2MoMD34kayEzNQLSsltrOt",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1d0nbio-ghFUBGcaVWGx7odc44BGK3M2i",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1d0u9D3-HI49Y8_rfVyYqsF0370dQJcdc",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1dxnRCpOn4oqdddz__zxJA5tFJ30Nr485",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1eECH9_DevgckLS8M3ixzvTCRBSJANEiJ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1eNONWLog7f1AM20-1Zgo577x-SeXwlSz",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1elBh3XHWtDG9eFOlF4sOb8Wqo_XfqIlz",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1eo-GDV49WcNSoNdJomS6qwFAXhdlWZIU",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1f4tqxNUDs1nrLPx58WDwom1s6bHcn7U4",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1g5ZoBt2V4fpX5-mp9ipHjUk3IPMmeDI5",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1gdBl61pGTxjbUAkLsAbcdg5fz9Y3BnZE",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1hllT5m46MHOJv2soQjKbCGm_i56ui3TN",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1i2Epn9NlLumCpU90OBxIMLPinqDmyNYl",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1iEEp69-yW2gUh4gCPce9cEuo8YaRG9ck",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1iO6OzgVSMc7L-e2molWWONl4a-3ZXh-s",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1lAbSBx9SnMKev9nZLcxp8_zVdV4ASPSb",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1lMLBq_r37B-lL-yxpoGjh4rKj85QIwK0",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1licgjZO3t-vC6eAQCu7zyXuD9ouaULfo",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1lp37VVSjsX9Yqc1vDhezSCR_RmqpabTy",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1msV6QtZ4XkZHFAX9fFM4UgmFkfy9q-pO",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1mvA_vbhLTIT2zdZiOvP4Vi6CaisGt9v0",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1n7IyvSMULFIYCqWyyc1ia7QfNy5ditNa",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1n99l6fnDqWnpWrJBde1PepmeF0171hJp",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1nAF1hv-q6vezYOYekMHhWs7Ho2ZFbFQ4",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1nCh-xg5dRGZ8Lltm9JEGakPRER8vKwcF",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ndVFaZoQDquHINWHPY9GiUrH-thFQQWG",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1ojSDByssKNVmJqXmE5N5cOe6AX2oR_sJ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1oqPjzj6tq8MuUKc8kuPoOeeUDBCWIajd",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1p8Yhqqt9Hjm6T-ixGAVt856eUGG8s4V2",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1p9hvDRdZSU1uEoW6o2pn3t5cWlh4LPa2",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1pK7-iDhDMti9no0V4qgMNnx3xqVp8l0o",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1pMoEgXffNsqLVFtoKc7NSPyX007TX2EQ",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1paJHZxLPrNUx6sPTQqFYrmUpnYBnpbuF",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1q4dvT_UdG4AZ0j5Y7kBUExfOPOMAroqD",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1rC95YJbQlr3RsfTF_6df-A0z5206CfRV",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1sMXDuLgBZgCFWb_h9ivJUyHedLaY7oHq",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1sOlTK0ZzPvGvlrHoQ8IcrvnStEyQSHo1",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1sfRCXbfLhRsWZos2Y870b-nANKxZuTMD",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1t4Tf4bf5u9oI0N7WAQJjRCJ0ezDIMtb9",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1tGEJmD14pfZlZM6PHRdyUiXMytQ7HFTD",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1tvUS7iGE2EaeNGcQ_yFYQEuEmDYlgKCx",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1u48bXc98f7MX656qLeowy3VPmDUzsE_v",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1u8UnSC371R0YITzNN3MyfQjieMGxloSn",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1vC43xvRtrZ6reiyq_xlnyQqbR2BW8BvD",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1vl3G_XxfAjtpvcSbJQALnu0tdCLFXenN",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1x5pXryqES8zH46s7k7fK2Bj9v6uA2dWC",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1xJA0UfMy3sZxTZSLBGVk8DhkfmXQPM6i",
    alt: "Image Not Found",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1zqaU77RYrtosCgvEJUfBnsNhbSZoY8w5",
    alt: "Image Not Found",
  },
];

const LightboxGallery = () => {
  useEffect(() => {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      zoomable: true, // Zooming is allowed by default in GLightbox
      openEffect: "zoom", // Animation effect when opening the lightbox
      closeEffect: "fade", // Animation effect when closing the lightbox
      slideEffect: "fade", // Transition effect between slides
      preload: true, // Preload nearby images for a smoother experience
    });

    return () => {
      lightbox.destroy(); // Cleanup
    };
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <a
          key={index}
          href={image.src}
          className="glightbox"
          data-gallery="gallery1"
        >
          {/* Using Next.js Image component */}
          <div className="gallery-item">
          <Image
            src={image.src}
            alt={image.alt}
            width={300} // Set appropriate width
            height={200} // Set appropriate height
            className="gallery-thumbnail"
            unoptimized // Disable optimization for Google Drive links
          />
          </div>
        </a>
      ))}
    </div>
  );
};

export default LightboxGallery;
