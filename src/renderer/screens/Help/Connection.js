import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { PageTitle } from "@renderer/components/PageTitle";
import React from "react";
import { useTranslation } from "react-i18next";
import { supportedDeviceVIDPIDs } from "@api/hardware";

const HelpConnection = () => {
  const { t } = useTranslation();

  // Check  the browser to see if the user is on linux, and if so, display the linux instructions
  const isLinux = window.navigator.userAgent.includes("Linux");

  // If the user is on linux, they're going to need to install udev rules to connect to the keyboard
  // write out the instructions for them here inline without using the localization file
  // instead of setting the file mode, we should set the thing that grants the loggged in user access to the device
  // Iterate through all known devices in our database and add a rule for each one
  // This will allow the user to connect to the keyboard without needing to be root

  // First build up a list of all known devices:
  const rules = supportedDeviceVIDPIDs().map((device) => {
    return `SUBSYSTEMS=="usb", ATTRS{idVendor}=="${device.usbVendorId
      .toString(16)
      .padStart(4, "0")}", ATTRS{idProduct}=="${device.usbProductId.toString(16).padStart(4, "0")}", SYMLINK+="${
      device.productName
    }",  ENV{ID_MM_DEVICE_IGNORE}="1", ENV{ID_MM_CANDIDATE}="0", TAG+="uaccess", TAG+="seat"\n`;
  });
  const linuxInstructions = (
    <>
      <h2>Linux</h2>
      <p>
        <b>
          These rules were last updated on May 17, 2024. If you installed the rules before this date, please replace
          them with these new rules.
        </b>
      </p>
      <p>
        If you are using Linux and aren't able to connect to your keyboard, it's likely that the <code>udev</code>,
        system which controls pluggable devices like keyboards, isn't set up to let you access your keyboard. To grant
        Chrysalis (and other applications) access to control your keyboard, you'll need to install a{" "}
        <code>udev rules</code> file.
      </p>
      <p>
        As root, create a file called <code style={{ userSelect: "text" }}>50-kaleidoscope.rules</code> in the directory{" "}
        <code style={{ userSelect: "text" }}>/etc/udev/rules.d/</code> with the following contents:
      </p>
          <pre style={{ overflow: "scroll", fontSize: "0.8em" }}>
          <code style={{ userSelect: "text" }}>{rules}</code>
        </pre>
      
      <p>
        Then, run <code style={{ userSelect: "text" }}>sudo udevadm control --reload-rules; sudo udevadm trigger</code>{" "}
        to apply the new rules without requiring a reboot.
      </p>
    </>
  );

  return (
    <>
      <PageTitle title={t("help.connection.title")} />

      <Container sx={{ my: 4, minWidth: "600px", width: "80%" }}>
        <Card>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: t("help.connection.overview") }} />
            {linuxInstructions}
            <h2>Getting help</h2>
            <p>
              If that doesn't work, please drop us a line at help@keyboard.io and we can help figure out what's wrong.
            </p>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default HelpConnection;
