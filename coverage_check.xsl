<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:for-each select="//class">
            <xsl:variable name="covered" select="counter[@type='LINE']/@covered"/>
            <xsl:variable name="missed" select="counter[@type='LINE']/@missed"/>
            <xsl:variable name="total" select="$covered + $missed"/>
            <xsl:variable name="coverage" select="($covered div $total) * 100"/>
            <xsl:if test="$coverage &lt; 20">
                <xsl:value-of select="concat(@name, ' - ', format-number($coverage, '0.00'), '%')"/>
                <xsl:text>&#10;</xsl:text>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
