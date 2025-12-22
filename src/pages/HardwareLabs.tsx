import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/animations/PageTransition";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cpu, MessageCircle } from "lucide-react";
import HardwareChatBot from "../components/hardware/HardwareChatBot";



/* ===================== TYPES ===================== */

interface Experiment {
  id: string;
  title: string;
  aim: string;
  requiredICs: string[];
  truthTable: { inputs: string; outputs: string }[];
  diagramImage?: string;
  falstadUrl?: string;
}

/* ===================== EXPERIMENT DATA ===================== */

const experiments: Experiment[] = [
  {
    id: "custom",
    title: "Create My Own Circuit",
    aim: "To design and simulate a custom digital logic circuit using a virtual digital trainer kit.",
    requiredICs: ["User Defined"],
    truthTable: [],
    falstadUrl: "https://falstad.com/circuit/circuitjs.html",
  },

  {
  id: "bcd_excess3",
  title: "BCD to Excess-3 Code Converter with Parallel Adder",
  aim: "To design and implement a BCD to Excess-3 code converter using a 4-bit parallel adder (IC 74283).",
  requiredICs: ["IC 74283"],
  truthTable: [
    { inputs: "0000", outputs: "0011" },
    { inputs: "0001", outputs: "0100" },
    { inputs: "0010", outputs: "0101" },
    { inputs: "0011", outputs: "0110" },
    { inputs: "0100", outputs: "0111" },
    { inputs: "0101", outputs: "1000" },
    { inputs: "0110", outputs: "1001" },
    { inputs: "0111", outputs: "1010" },
    { inputs: "1000", outputs: "1011" },
    { inputs: "1001", outputs: "1100" },
  ],
  diagramImage: "/images/bcd_excess3.png",
  falstadUrl:
    "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKDGMIoBYvxiUQhFL3YCBXFgBkQXbANEyOfAVSoAzAIYAbAM51qkKTLkgUwxZzO9VITbv1JD02WIScuSlG6g+7eg0Yupnh4FsGhNn4OUIEmclQenPE+6tr+jrEC2AjiStkqvmn6qpkg2Hi8iWUVPhBRAc4mXGDuSs2cVHVFDcbiXKFVPBGF9gEA7twi-L3KMRMIPKbmQVZzk6beK96G84soITP7ESy7vMlByTvr+TM3VwtnNRc194vtM++vlf0fP4YtAkIXCoXk4GDQG0sIAAJnRNABXLQAFwYWjo0PAKSgsFYAMEwPCIHBIIOAlhCORqPRmJsMEguKE+KoyWJZQhZLhGkRKLRGIgtJxbEZQOZOSJEJuHIpPOp-JSgrxItmrIUUq5lN5NPl9JYQA",
},

  {
    id: "excess3_bcd",
    title: "Excess-3 to BCD Code Converter with Parallel Subtractor",
    aim: "To design an Excess-3 to BCD code converter using a parallel subtractor.",
    requiredICs: ["IC 74283", "IC 7486"],
    truthTable: [
      { inputs: "0011", outputs: "0000" },
      { inputs: "0100", outputs: "0001" },
      { inputs: "0101", outputs: "0010" },
      { inputs: "0110", outputs: "0011" },
      { inputs: "0111", outputs: "0100" },
    ],
    diagramImage: "/images/excess3_bcd.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKAA8QUzPsAWEbER7l+KfgFFI7TsTydI-QeTQjOE1hy5ywGKkvA4QoiSmm4qYbOUHFwvKsZDjsLMMUJHB4FHN69tPpxGLAAyniiceHLY2B4+chYgAGYAhgA2AM501FJhvF4oCB4xcUVQ4MnpWTmh4QIIESX1EYmpmdlIuXXYeIqxAr3lVG3VnbX5jWgC-YJUc5XtNWCEEQ3axBGEGBFuEREAJnSpAK5pAC4MaXT7FfMwkKzLq4EoYiBbe28HRymnF1c3CB3WCPFYUF5lD6cMrfE7nS7XW5DEGuMFrSJyKHxIKHOH-RFA5EPaQkKhcJAYNwyXxqEAAISkHBIe0I-G2ECIqjedI072IZJiIEpthQ-UcdNMTKi8iolOUkGwRlpdJceS8YECTQ1CXKIw6UHG6sIen6y3mED1NTVOw20w8uyGC1GButnDeTVe-HmlrGQA",
  },

  {
    id: "full_adder",
    title: "Full Adder",
    aim: "To design and verify the truth table of a full adder.",
    requiredICs: ["IC 7486", "IC 7408", "IC 7432"],
    truthTable: [
      { inputs: "A B Cin = 000", outputs: "Sum Cout = 00" },
      { inputs: "001", outputs: "10" },
      { inputs: "010", outputs: "10" },
      { inputs: "011", outputs: "01" },
      { inputs: "100", outputs: "10" },
      { inputs: "101", outputs: "01" },
      { inputs: "110", outputs: "01" },
      { inputs: "111", outputs: "11" },
    ],
    diagramImage: "/images/full_adder.png",
    falstadUrl: "https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKDDwBYRCUvmVuHKvyggUbTt14hshPIKqz5VcQBkQeYoXAZtm7WEJVjIAGYBDADYBnOtUgt1YSNLC7kro6IgWbdpA4A7iAYaGKhGlrhAkGR2pgC+jrasaG0KPJJCBlQLMFZOUkJucFy8sVlMpBcsZW4fC5c9SUeTdWtyS3O0s3dXAjutXjy2fKVAyl53MMU7n2zk4YCGNngYInYAiICACZ0FgCulgAuDJZ0O+CixrCsSyGrShqbMnJiIHuHJ2cXVyYwkFYAA8NIQkOxyMMIGBiFQuNIAIIsEGkAzELaArbEJDwrgAIWRVW0uAgm2wVS4uJAAGFCRxiOTsM4KGAmmByVTqQByQkYDjQ+khWHgVZUgDKBwAtryhCAhMtiPIhDixFxqeYAE4agCejhksjEM2wBuKwjMVls9imxviM35tuULAAknLDIalYR4TMbkgEFMOJ73RQOF7HcEECGgxG+JHYtHwJGeDGaiwAOYUdGvEaZ7CSYxTBA5t5JrMtXOUuBSCv54LluWVuscF6xRsvEtNmIsABKVblgYmfZqollAWu0D9pXwnRLbkmk-ks4WnTjc3cA4yYaXG+DoZaJbQYx6YVqR8UBs2Nf1xLCNqDLfPN4NQkvt+fMkkb9i9qD35EX7dIgzusuRAA",
  },

  {
    id: "full_subtractor",
    title: "Full Subtractor",
    aim: "To design and verify the truth table of a full subtractor.",
    requiredICs: ["IC 7486", "IC 7408", "IC 7432", "IC 7404"],
    truthTable: [
      { inputs: "A B Bin = 000", outputs: "Diff Bout = 00" },
      { inputs: "001", outputs: "11" },
      { inputs: "010", outputs: "11" },
      { inputs: "011", outputs: "01" },
    ],
    diagramImage: "/images/full_subtractor.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWc0FwCwCY0HYEA4cEMElURTJyBTAWjDACgwE1w1WNsMRPveoe5ckxYgAzGIBsPBNLSSOsgd1IMA7jy6buYyBy2R14vdvFTThjRjx5w1kPNZh7hgLLkAnNzCTKkrOC+ghgoRo52tuFg7FBhCjLSCNjSxNKW5MkJGSmQtm7ZPLkg-hxFfKHMlNFO9ta2znmClAgilBLSYJlRmZTczSLcUUEIXoGUbUItlcas7Q5iOua9kwwAkmyzGL0BC+NQKMIAHuIpHs18HmIOPKwAggzH5hjDfJJXHKwAQg-gVxjODmwPGY1wCnwAlgA7BgAGQ2WXiqQEEAAZgBDAA2AGcqEJDHDqjwbMUOMS9ujsbikPixoVbIiiuTMTi8UYfL0ysStnkjHU6UTbFhxryuWg2k8xbFjgpegDJElgUgPiAACJsmJ8wm7WJWHZbGbifXpQlIk0GdX6bwA-jG61aeg6Ig68AAsRO3SzJ3GjVKQlgUbepyjOb+vpsoLc2ns53R6MhoLGoLRjwdBNGFO0jOE9JZmJ+mLpDB67azSQ83Wl2x4Npl53Vk5VqoA9L1h3wtvpNALMxyeJzTt98xDYVAA",
  },

  {
    id: "comp_1bit",
    title: "1-bit Comparator",
    aim: "To design and verify a 1-bit magnitude comparator.",
    requiredICs: ["IC 7486", "IC 7404", "IC 7408"],
    truthTable: [
      { inputs: "A B = 00", outputs: "A=B" },
      { inputs: "01", outputs: "A<B" },
      { inputs: "10", outputs: "A>B" },
      { inputs: "11", outputs: "A=B" },
    ],
    diagramImage: "/images/comparator_1bit.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKABkRMVONuxCqXKMIBmAQwA2AZzrVI7HtxQoALOAGdVwiOOmyk8gB4hSnbHzBIU2JGq0BBFsbCQIKPFWbl32EHbUAQiwAkiC4amAqath4EVHCMEgIIWFoYQjcKubp3FSJFCwA7oolQpFq8sVl8eHg8ZWlWuaCWg3NmtFpNrlFqS1qKnAdUL1CQtjYhCXyllRZ3BNTCBqLwrkFxavjk30jmzvt87ttO0KDgrwjlgNDqrTxd2vUycXnnMt+t5czlH7ZYO4KMQ+IDBM9ejE4gN-vVem9lDdPAC9p8kZl-sj5KEEA9BiBCB9HnloEknCAMCpyGBsBAMMRfNSBpw1PYAHxBYwYBB4ZlUDz+Xz+ED2AA6AEcOeTuWEYiB+WEVBAhfYADxBfjcBDA8CAwh4HkAnncAAmdHEAFcJAAXBgSOjG8AJKCwVga-GEvE4KaPE1msSWm12h0QPLO1wsN3LKirQiXLYgU0W622+2O0MwcNAA",
  },

  {
  id: "comp_2bit",
  title: "2-bit Comparator",
  aim: "To design and verify a 2-bit magnitude comparator.",
  requiredICs: ["IC 7486", "IC 7408", "IC 7432"],
  truthTable: [
    { inputs: "A=00 B=00", outputs: "A=B" },
    { inputs: "00 01", outputs: "A<B" },
    { inputs: "01 00", outputs: "A>B" },
    { inputs: "01 01", outputs: "A=B" },
    { inputs: "10 01", outputs: "A>B" },
    { inputs: "01 10", outputs: "A<B" },
    { inputs: "11 10", outputs: "A>B" },
    { inputs: "10 11", outputs: "A<B" },
    { inputs: "11 11", outputs: "A=B" },
  ],
  diagramImage: "/images/comparator_2bit.png",
  falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgzCAMB0l3BWEBGaC4BYBMGDsCAOPBLBJdEcySgUwFplkAoAGRADYMQCCOuF2ILFBAAzAIYAbAM41KUJgHc+3Xj1UKAkhvXrkGLtRjlWKZML3nKg4dQky5SSKaxwNr6gKEj7s+c7YcNV4g6287KT8nJTMLXmQwQXVnbQSk+MSUAxFjSiZkBC4wSC5kXEFE6jLBZHC85U4NRuR2XmcG0tbwEpQu9qE3dQ8UIgVlYeRR4tLR5wKinqwW8HZqJZq6hBjGONiBtu2rV15p-bGhDGCLkJxz0Kxb04fDfIRap69KoS9a4RNxtyTLjDLCNfogxpPMExL7rFZVACcthiGGWWAI1CeGIUBXe6PAVgwbjAVne8i2ynUpzA+NO-TSBOENJOVn6WMxPRpRhhnNc4FpfLmb35JxIICJmLFZP+3SKfOpq3OCsxtMV-VRNVGGqE2KFtQwNMZlE5pPAIgp8O+ggNwlIgnVhrt4sNdJRxMJLtZbslwht4DFDqZYr9XJxYq+QPFy0jv3NMWGYGyzPA2XBblBwOJqfjlyEt1CYADOdFTNpRe02sjb2EkaMaDyAFljUUrKtMayhGgmE3qyMuG2+yIsF2AB7cd64EAIydE8UXEAAQSYY6WCPAIULUbntwAQsvKBgkC01wh8ChcL7eouADoARz3yl7VasYCR53QLb+PSJBwKEF7EqUOU4qApsMQfiBvAAZABw9sBgEDoBayjgeNgIlBwHFPqV4LgAPHuY6FBUuD8JhuAzjhAB8D4aPoXBDLm-QMVcrqUiEuZPIx2yZHRKCZCSyJAA",
},


  {
    id: "bin_gray",
    title: "Binary to Gray Code Converter",
    aim: "To design a binary to gray code converter.",
    requiredICs: ["IC 7486"],
    truthTable: [
  { inputs: "0000", outputs: "0000" },
  { inputs: "0001", outputs: "0001" },
  { inputs: "0010", outputs: "0011" },
  { inputs: "0011", outputs: "0010" },
  { inputs: "0100", outputs: "0110" },
  { inputs: "0101", outputs: "0111" },
  { inputs: "0110", outputs: "0101" },
  { inputs: "0111", outputs: "0100" },
  { inputs: "1000", outputs: "1100" },
  { inputs: "1001", outputs: "1101" },
  { inputs: "1010", outputs: "1111" },
  { inputs: "1011", outputs: "1110" },
  { inputs: "1100", outputs: "1010" },
  { inputs: "1101", outputs: "1011" },
  { inputs: "1110", outputs: "1001" },
  { inputs: "1111", outputs: "1000" },
],



    diagramImage: "/images/binary_gray.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAQBYKLIKBTAWjDACgAZEYwkFFa7Cl78oogGYBDADYBnejUgcuPXAKGrRESbPlJFnbuBR4Qgoybp1tchazBVwxIWEJ0NLy71EI7DsE94EFTRAnjohJB97an91QhMNbHjRIToownVIakNsPGyeIQATekkAVykAF0YpekLwUUtYNhdMmNdTPPB2opKJcqqauohPGEhmjNMs0I7qFCCvYrLK6tr6kaa7CeME5NyBZJ6lgdXhho2Ad2VzK8NFS8McqdvWe54wYyuwSmo7z+-HZz-X6GPj5cAYMIvT4QgHgyGvYRg-iWKEgyh0WK8dFQVEqJ4FDCpXG8QmwzBEhEaHIIClXbA02H0okADwo5BYPDwb38IFm1AAQthWKytmBsFwICgXLysSB+ShhSAtg9JaQZSJ+WxWaT0W8xrzIMR1QLFKzsKS8HR0dQ8OK+SAAOJCs0YCBfcjo8X2K2yh0Kl2Syh2yDi-g8e0OrWmDBudrouJ232-bamXZTJIWKEaObBcLzX4sdSdTF7HGXQszcDvXnS-RVoSUaVmRtherWXQ4oA",
  },

  {
    id: "gray_bin",
    title: "Gray to Binary Code Converter",
    aim: "To design a gray to binary code converter.",
    requiredICs: ["IC 7486"],
    truthTable: [
  { inputs: "0000", outputs: "0000" },
  { inputs: "0001", outputs: "0001" },
  { inputs: "0011", outputs: "0010" },
  { inputs: "0010", outputs: "0011" },
  { inputs: "0110", outputs: "0100" },
  { inputs: "0111", outputs: "0101" },
  { inputs: "0101", outputs: "0110" },
  { inputs: "0100", outputs: "0111" },
  { inputs: "1100", outputs: "1000" },
  { inputs: "1101", outputs: "1001" },
  { inputs: "1111", outputs: "1010" },
  { inputs: "1110", outputs: "1011" },
  { inputs: "1010", outputs: "1100" },
  { inputs: "1011", outputs: "1101" },
  { inputs: "1001", outputs: "1110" },
  { inputs: "1000", outputs: "1111" },
],

    diagramImage: "/images/gray_binary.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAQBYKLIKBTAWjDACgAZEYwkFFa7Cl78o4EADMAhgBsAzvRqQOXHtgRDBINULp0pchUiWdu4FHi1Cw50RH3zFrMFXDErhOrmpgPonRScXMDctSAE0UOo6fwRA7xDKH0iQRJ5omlifDTCVLTxqUyEAE3opAFdpABdGaXoisV0oWDYs5J9PfPBfYtLJCura+ohGmEgWwmyBHOxOr14QEvKqmrqG0VHxoXMLVLzqXZ6lgdXh9ebWAHdc6wtTUyUru9Uc+8vrm1MwSii3z+-XKz-B65PgFHhgDBpX7gyEA8Cw4GmbS5QS6aGWOjBDQRJQADy0xCQYEgQkoImJSGoIgAQthWPjsMRvIQdihsPCIFTqNSUPSUvgtGB2ZRsORsEkuSBqWx8ZQSSlsPtxQryJLqXiKETIEg8ORiTteNQAOJ0-EIdloIR4JBoSmGkBG3lmpDYNQgXVaGYpe1GmUgCYpBA8JmB4jekRG4HbFJJOa7YFzRMRObAlikzRYhU6ZRprOWPOYiQyBxGN4zZkdLloq7lw2YkL8at7ZK15EJ2bqLqeTup3zI9r8psDuX10lwKBvTONuHRpRAA",
  },

  {
    id: "decoder",
    title: "Realization of Decoder",
    aim: "To design and implement a decoder circuit.",
    requiredICs: ["IC 7404", "IC 7408"],
    truthTable: [
  { inputs: "0000", outputs: "Y0" },
  { inputs: "0001", outputs: "Y1" },
  { inputs: "0010", outputs: "Y2" },
  { inputs: "0011", outputs: "Y3" },
],

    diagramImage: "/images/decoder.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgzCAMB0l3BWK0AsBGATGMCME48B2DANjwA4M0IFIQlb6BTAWjTQCg0jwTyQ2JECjAYBaIZC4JCIEsRASQ5EikWSQsulIAyvfuToYEQw1EUgAZgEMANgGcm9KBz1g+w-saEp+dNFZ2js66+uog3uH+gQ5OSKHu-IIRJuIadDaxIRwAHup4ykho5Ejk-GoYagCCueqyCBDFND4RagBCtRKyaN3kFXQVagDCnfLiasVqbAGDIAAiHADucgpKCHhiSlLL65tCu2kuOxuHKHhCydvC5+Em-FtL9B5rHr5HT+X8JHCe798DXwUbyu8jEZgQuGU2keELBdFhvyuCLeZx8fkeoMUmHoGHu2KRuKxYlwBmhO0JZlRUPeVJ6ph+dPehn8KDUzMUhEkj1prM0z15V0I7kUvKFQgkZM0wol13F3xpNxltPxHCAA",
  },

  {
    id: "encoder",
    title: "Realization of Encoder",
    aim: "To design and implement an encoder circuit.",
    requiredICs: ["IC 7432"],
    truthTable: [
  { inputs: "0001", outputs: "00" },
  { inputs: "0010", outputs: "01" },
  { inputs: "0100", outputs: "10" },
  { inputs: "1000", outputs: "11" },
],

    diagramImage: "/images/encoder.png",
    falstadUrl: "https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKDARREJQBYQ08IDGn74o-cQjaUKKQSl5dFCvlU60WASRA8e8sR32CqMJFIDuSvmDk6whcLcjTOPeyFx8Euj5FUSNSzcHG0Fg-jxjFiD3bBFsQkE4k2iPRI949IEoVISjHT1RKIAZNPy5fJMQADMAQwAbAGc6amdS8NCIwU6quqaWpGdLQ34eKmwE0ZTLCYdeccnMdRZS2f5hLvX1cT7m1pcKHzyhTOMPSRXDvmw8PgqPW-EqXYGcmcWNteOhj0nj72u6R+AN8XiOHByAFkTuN0hhHt9+NApNDhGoxPC7mJOChkakQZ4hH8-G8iQ5CTgQk4WKjJp1MY55EiLFZGaywMRlkA",
  },

  {
    id: "jk_ff",
    title: "Master-Slave JK Flip-Flop",
    aim: "To design and verify the operation of a master-slave JK flip-flop.",
    requiredICs: ["IC 7476"],
    truthTable: [
  { inputs: "J=0 K=0", outputs: "No Change" },
  { inputs: "J=0 K=1", outputs: "Reset (0000)" },
  { inputs: "J=1 K=0", outputs: "Set (1111)" },
  { inputs: "J=1 K=1", outputs: "Toggle" },
],

    diagramImage: "/images/jk_ff.png",
    falstadUrl: "https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBsBmALAJhQdgWgJwAcYKCFICkVVNCApgLRhgBQYCEGaW4GGKlmL9BNPvQ5cQPPlgQohI+YvG0EbAO4zeILFkGy9GGpC06+ZGkbC5V5hML0GlehVAdP9h3bfvbHETABVz8PAKcwo28PTgheGjAnGyc1JA04kAS9XD5o3Kg9dXNs4MFslXCsrHF3bLQ0e0ywQksQ4SCQtKopCBa5dw63VSLJbVKkvWIgybNtIdY5adEqocq15bmp5WWKzfN+8BRE1vA7KsODE7kXLbWXNfc75ZjDsOeg84Wu8wXzy9uvRAxESkVOSRENDQhQ0AEkQChyo1qlDkaZoOk2ABZUIhBDgrp6DHY1yVfEDEZYYkADyoYBmuCoyKS1mMIAAimxaY4oZB0mgRGhICJFC5OeNLJMQeBZlystZGdg6DI2QApNgAJQRSMUugaigglhqRKQVKQ6Iy0mlWAKlwKUOK2hsxws2qqRkRwJonq20s90ohHgAMtVhqGYokQAAzACGABsAM4MWhmWkuFrQkzgQiKQQuADS5k9+rdlS2nsq1qe5gDIU9ZSq9breerEu24db4eW1v2Tt0V1djUh5iMQ69WRQw+00rH1vtbBDvkmumlkdjieT5rlLEgfWkiQQhnAfFV+YAOgBHOAALjPCYAcgB7O8AYQAFjGAHYAcwY27Au5HIQIBMEqth5MeICnpeAG3gmADKDAAC7-oB9KMkwWDAS0rKTNBV5gHBGoMEmKG0juhp8iBOB6MKKp4eeF6sHBAAqj7ft+cZ-o+MgimIMgAXw5qwPAhB2Ao8iFHkgpQWwPFoIyPoCZAQlQCJcBieQKCSWoClZCAhY8TRSkYIJKbqZAmkSea4AcnJoYmWZwnwJZ4naTZfB6iAADGcYANZsEAA",
  },

  {
    id: "up_counter",
    title: "Up Counter (Mod-N)",
    aim: "To design and verify a Mod-N up counter.",
    requiredICs: ["IC 7493 / IC 74163"],
    truthTable: [
  { inputs: "Clock 0", outputs: "0000" },
  { inputs: "Clock 1", outputs: "0001" },
  { inputs: "Clock 2", outputs: "0010" },
  { inputs: "Clock 3", outputs: "0011" },
  { inputs: "Clock 4", outputs: "0100" },
  { inputs: "Clock 5", outputs: "0101" },
  { inputs: "Clock 6", outputs: "0000 (Reset)" },
],

    diagramImage: "/images/up_counter.png",
    falstadUrl: "https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWEAOaAmZYCcB2BzkcBmLUhJBSECqhAUwFowwAoAFjQjQQDYQs+RNFQFQQbMbUksA5iB4S0aCQpDc+VSCwDu8xcrW81BrQCV+fDMnBg0agpPFTNUaAnbYQRBHdvWEtuAYYmw6ekHW6hFQLObMvnxgOImJauBwam6ZSJpuYVGi8RYxukWFgWAa+UaVVKq1JeBsig5RVo3edkREic1ePY1gfd29LdZacvU8dRLYdpqy4X5LfQu6ou1DYx0+9tad-VWlyeBYdlFzgyeXW6fz1ZZGbQ4TTbNnb2qQ4zvnRgftLRAA",
  },

  {
    id: "down_counter",
    title: "Down Counter (Mod-N)",
    aim: "To design and verify a Mod-N down counter.",
    requiredICs: ["IC 74193"],
    truthTable: [
  { inputs: "Clock 0", outputs: "0011" },
  { inputs: "Clock 1", outputs: "0010" },
  { inputs: "Clock 2", outputs: "0001" },
  { inputs: "Clock 3", outputs: "0000" },
  { inputs: "Clock 4", outputs: "0011 (Reload)" },
],

    diagramImage: "/images/down_counter.png",
    falstadUrl: "https://falstad.com/circuit/circuitjs.html?ctz=CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUMgkSPtdmimnwg+UKKwDu3Xln5EALMJljJ8xbIVgwXSBJCrNXHuC1iASnoUiw-EdWpy6ou9AStzRh0MarPKYcLhhFyCkZ1dJIzwFDwJlFCwuZHwFLBJ+JIUdDmpkBOFkLjQ0SwK-fjp2BBtitVqRZH8KjkKlETlS20pdIpLCmuJMypy8sDlLGtGFBvKuyR7wMeF+ox0AGVEDEEY5IU2ckAAzAEMAGwBnehodSWo9gKFr0QwhXMLYx9uTW6IH1gBJDY-CzgIFhWbArQvEag3SvcBVeJcSFxGJCYpCXyPdEgXzYqJxPGQSxKfFY1rk-h7WF5DKIpaDSRw+ZMpRZKjgZL0nH9GrTUThLloUpgTlC7S6EWWawgtHSx7ItDShWsiVAxWUoEccqVLhyCl6Dqsrpa7nE-h6mxKPlNdnIyamhZTRrguTLewTRaPV3jBTe4SqLE7HGxOScYO-SR2oF2hFe-UW4ziyShpFEnFhzG6FPgNMJ0ndD0+mUEibRssRh3Izi7GGSBJCfBCeu1R5EMP4ogktOt9tptu6966TuW2Qkr66avFydgWNZjOxfvhuJEfrSleWANDt16QtibKUaOLdeOsr8yqyfpKYe1a3GsPXkT4Q0zAWT4p0TUYOIIUUOA9ov8vR5BQfyLNk6FFNdV3SZ1XzVJQ30ArNdz9ZEdAADy2fASHAFgtg4XDfRQIQAFUAAcAHoABEAHtxAAO1YdocNSfhG24MN2PsXRm3Y1juArSdkC-fjhLsVUXgRUTZyAA",
  },
];

/* ===================== PAGE ===================== */

const HardwareLabs = () => {
  const [selected, setSelected] = useState(experiments[0].id);
  const [chatOpen, setChatOpen] = useState(false);

  const exp = experiments.find((e) => e.id === selected)!;

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-12 gap-6 h-[calc(100vh-7rem)]">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 surface-card p-6 space-y-5 overflow-y-auto h-full">

            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experiments.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <h3 className="font-medium">Aim</h3>
              <p className="text-sm text-muted-foreground">{exp.aim}</p>
            </div>

            <div>
              <h3 className="font-medium">Required ICs</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {exp.requiredICs.map((ic, i) => (
                  <li key={i}>{ic}</li>
                ))}
              </ul>
            </div>

            {exp.truthTable.length > 0 && (
              <div>
                <h3 className="font-medium">Truth Table</h3>
                <table className="w-full text-xs border">
                  {exp.truthTable.map((r, i) => (
                    <tr key={i}>
                      <td className="border p-1">{r.inputs}</td>
                      <td className="border p-1">{r.outputs}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}

            {exp.diagramImage && (
              <img
                src={exp.diagramImage}
                className="w-full rounded border"
                alt="Circuit Diagram"
              />
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 surface-card p-4 h-full flex flex-col">

            {exp.falstadUrl ? (
              <iframe
  src={exp.falstadUrl}
  className="w-full flex-1 rounded border"
/>

            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                Falstad simulator link will be added here.
              </div>
            )}
          </div>

          {/* CHATBOT */}
          <motion.button
  onClick={() => setChatOpen(true)}
  className="
    fixed bottom-6 right-6 
    w-14 h-14 
    rounded-full 
    bg-primary text-white 
    flex items-center justify-center
    shadow-lg
  "
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <MessageCircle className="w-6 h-6" />
</motion.button>


          <HardwareChatBot
  isOpen={chatOpen}
  onClose={() => setChatOpen(false)}
  experimentContext={exp}
/>


        </div>
      </PageTransition>
    </Layout>
  );
};

export default HardwareLabs;
