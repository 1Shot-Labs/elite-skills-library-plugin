#!/usr/bin/env bash
#
# Elite Skills Library Plugin Validation Script
# Validates plugin structure and configuration
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(dirname "$SCRIPT_DIR")"

echo "Elite Skills Library Plugin Validator"
echo "======================================"
echo ""

ERRORS=0

# Check plugin.json exists and is valid JSON
echo -n "Checking plugin.json... "
if [ -f "$PLUGIN_DIR/.claude-plugin/plugin.json" ]; then
    if python3 -c "import json; json.load(open('$PLUGIN_DIR/.claude-plugin/plugin.json'))" 2>/dev/null; then
        echo "OK (valid JSON)"
    else
        echo "FAIL (invalid JSON)"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "FAIL (file not found)"
    ERRORS=$((ERRORS + 1))
fi

# Check required directories exist
echo -n "Checking commands directory... "
if [ -d "$PLUGIN_DIR/commands" ]; then
    CMD_COUNT=$(find "$PLUGIN_DIR/commands" -name "*.md" | wc -l)
    echo "OK ($CMD_COUNT commands)"
else
    echo "FAIL (directory not found)"
    ERRORS=$((ERRORS + 1))
fi

echo -n "Checking skills directory... "
if [ -d "$PLUGIN_DIR/skills" ]; then
    SKILL_COUNT=$(find "$PLUGIN_DIR/skills" -name "*.md" | wc -l)
    echo "OK ($SKILL_COUNT skills)"
else
    echo "FAIL (directory not found)"
    ERRORS=$((ERRORS + 1))
fi

# Check required files
echo -n "Checking README.md... "
if [ -f "$PLUGIN_DIR/README.md" ]; then
    echo "OK"
else
    echo "FAIL (file not found)"
    ERRORS=$((ERRORS + 1))
fi

echo -n "Checking LICENSE... "
if [ -f "$PLUGIN_DIR/LICENSE" ]; then
    echo "OK"
else
    echo "FAIL (file not found)"
    ERRORS=$((ERRORS + 1))
fi

# Check plugin.json has required fields
echo -n "Checking plugin.json required fields... "
REQUIRED_FIELDS='["name", "description", "version"]'
MISSING=""
for field in name description version; do
    if ! python3 -c "import json; d=json.load(open('$PLUGIN_DIR/.claude-plugin/plugin.json')); assert '$field' in d" 2>/dev/null; then
        MISSING="$MISSING $field"
    fi
done
if [ -z "$MISSING" ]; then
    echo "OK"
else
    echo "FAIL (missing:$MISSING)"
    ERRORS=$((ERRORS + 1))
fi

# Check commands have frontmatter
echo ""
echo "Validating command files:"
for cmd_file in "$PLUGIN_DIR/commands"/*.md; do
    if [ -f "$cmd_file" ]; then
        cmd_name=$(basename "$cmd_file")
        echo -n "  $cmd_name... "
        if head -1 "$cmd_file" | grep -q "^---$"; then
            echo "OK (has frontmatter)"
        else
            echo "WARN (no frontmatter)"
        fi
    fi
done

# Check skills have frontmatter
echo ""
echo "Validating skill files:"
for skill_file in "$PLUGIN_DIR/skills"/*.md; do
    if [ -f "$skill_file" ]; then
        skill_name=$(basename "$skill_file")
        echo -n "  $skill_name... "
        if head -1 "$skill_file" | grep -q "^---$"; then
            echo "OK (has frontmatter)"
        else
            echo "WARN (no frontmatter)"
        fi
    fi
done

# Summary
echo ""
echo "======================================"
if [ $ERRORS -eq 0 ]; then
    echo "Validation PASSED"
    exit 0
else
    echo "Validation FAILED ($ERRORS errors)"
    exit 1
fi
